# Objectifs

Cette étape consiste à mettre en place un `reverse proxy`, s'occupant de rediriger les requêtes HTTP soit sur le serveur statique de l'étape 1, soit sur le serveur dynamique de l'étape 2, en fonction de l'URL désirée.

Le but est de faire en sorte que seul le `reverse proxy` soit atteignable depuis l'extérieur (machine locale). Aucun accès direct sur les serveurs 1 et 2 ne doit être possible, hormis depuis le réseau interne des containers.

# Configuration

## Dockerfile

Pour cette étape, nous avons besoin d'un nouveau serveur `apache` qui sera utilisé comme `reverse proxy`.

Nous avons décidé d'utiliser la même image que pour l'étape 1 même si nous n'avons, à priori, pas besoin de `php`. Cette dernière est décrite dans le fichier [Dockerfile](../docker-images/apache-reverse-proxy/Dockerfile).

Cette fois-ci, nous allons modifier la configuration d'`apache` et fournir des fichiers de configurations personnalisés. Ces derniers seront copiés dans `/etc/apache2` grâce à la commande `COPY`. Ces fichiers de configurations correspondront aux sites que nous activerons dans `apache`.

Pour pouvoir utiliser le serveur comme un `proxy`, il est nécessaire d'activer les modules `proxy` et `proxy_http` de apache grâce à la commande `RUN a2enmod proxy proxy_http`. Il faut également activer les deux sites correspondant aux configurations fournies grâce à la commande `RUN a2ensite 000-* 001-*`.

## Configuration apache

Nous avons utilisés deux fichiers de configuration. 

Le premier, [000-default.conf](../docker-images/apache-reverse-proxy/conf/sites-available/000-default.conf), sera utilisé lorsque une requête arrivera sur une URL non gérée par le `proxy`. N'ayant pas besoin de comportement particulier, ce fichier ne comprend que la déclaration d'un hôte sur le port 80. Lorsqu'une requête arrivera sur une URL non redirigée, une réponse 404 sera retournée.

Le second fichier [001-reverse-proxy.conf](../docker-images/apache-reverse-proxy/conf/sites-available/001-reverse-proxy.conf) est utilisé pour définir les deux redirections que nous utilisons.

L'option `ServerName` fait en sorte que seul les requêtes possédant cette valeur comme en-tête HTTP `Host` soient redirigées. Dans notre cas, les requêtes ne possédant pas `api.labo.ch` ne seront pas traitées par cet hôte virtuelle mais par celui défini dans le fichier `000-default.conf`.

Pour effectuer une redirection, il suffit d'ajouter deux lignes :
```
ProxyPass "/che/min/" "http://ip_de_redirection:port_de_redirection/"
ProxyPassReverse "/che/min/" "http://ip_de_redirection:port_de_redirection/"
```
La première permet de rediriger les requêtes effectués sur `/che/min/` pour les rediriger vers le serveur spécifié.
La seconde permet d'effectuer la même chose mais dans le sens inverse (serveur -> extérieur).

Les règles étant analysées séquentiellement par le `proxy`, leur ordre est important. Il faut donc commencer par les règles les plus spécifiques. C'est pour cela que la redirection vers le serveur dynamique sur `/api/prize/` vient avant celle du serveur statique `/`.

## Problèmes de la configuration

La configuration utilisée est pour le moment fragile. Les adresses IPs des serveurs étant codées en dur dans les fichiers de configuration, le fonctionnement de l'infrastructure dépendra des adresses définies par `docker` au lancement des containers et sera donc dépendant de leur ordre de lancement.

# Utilisation

Il est nécessaire d'avoir construit les images des étapes 1 & 2 pour effectuer cette partie. De plus, lors du lancement des containers liés à ces dernières, il ne faut pas effectuer de port mapping, les rendant ainsi inaccessibles depuis l'extérieur du réseau `docker`. Il faut également [modifier le fichier](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/) `hosts` pour pouvoir accéder au serveur `proxy` via son nom d'hôte plutôt que son adresse IP. La valeur ajoutée doit correspondre à celle renseignée dans `ServerName` du fichier `001-reverse-proxy.conf` pour les raisons décrites plus haut.

Dans notre cas, nous avons effectué cette manipulation sous Windows et avons ajouté la ligne suivante :

```
127.0.0.1 api.labo.ch
```

dans le fichier `C:\Windows\System32\drivers\etc\hosts`. Ceci nous permet d'accéder au serveur sur `api.labo.ch:8080`.


Il est primordial de respecter l'ordre d'exécution décrit ci-dessous pour que l'infrastructure fonctionne correctement.

Marche à suivre :

1. Construire l'image en exécutant le script [build-image.sh](../docker-images/apache-reverse-proxy/build-image.sh)
2. Exécuter le serveur de l'étape 1 `docker run -d api/apache-php`
3. Exécuter le serveur de l'étape 2 `docker run -d api/node-express`
4. Exécuter le `reverse proxy` avec `docker run -d -p 8080:80 api/apache-reverse-proxy`
    - `-p` : Le port `80` du serveur sera mappé sur le port local `8080`
    - `-d` : le container sera lancé en arrière-plan
5. Accéder à `api.labo.ch:8080` pour accéder au contenu statique
6. Accéder à `api.labo.ch:8080/api/prize/` pour accéder au contenu dynamique
