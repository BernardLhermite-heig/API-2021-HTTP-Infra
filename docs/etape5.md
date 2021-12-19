# Objectifs

L'objectif de cette étape est de modifier le `reverse proxy` de l'étape 3 pour que les adresses IPs soient fournies dynamiquements en passant des variables d'environnements au démarrage du container.

# Configuration

## Script personnalisé

Pour pouvoir créer dynamiquement le fichier de configuration du `reverse proxy`, nous avons dû modifier [le script](../docker-images/apache-reverse-proxy-dynamic/apache2-foreground) exécuté au démarrage du container. Nous avons repris [celui de l'image de base](https://github.com/docker-library/php/blob/master/8.1/bullseye/apache/apache2-foreground) et ajouté les instructions nécessaires : 

```
echo "Static app: $STATIC_APP"
echo "Dynamic app: $DYNAMIC_APP"
php /var/apache2/templates/config-template.php > $APACHE_CONFDIR/sites-available/001-reverse-proxy.conf
a2ensite 001-reverse-proxy.conf
```

Ces quelques lignes nous permettent de générer le fichier de configuration depuis un template `php` puis d'activer de l'activer.

## Template php

Le fichier de configuration est basé sur un [template php](../docker-images/apache-reverse-proxy-dynamic/templates/config-template.php) faisant essentiellement la même chose que celui de l'étape 3. Les IPs/ports utilisées ne sont plus écrites en dur dans le code mais sont récupérées grâce à deux variables d'environnement `DYNAMIC_APP` et `STATIC_APP`.

## Dockerfile

Le [Dockerfile](../docker-images/apache-reverse-proxy-dynamic/Dockerfile) a été modifié pour copier notre script personnalisé `apache2-foreground` ainsi que notre template `config-template.php` dans le container.

# Utilisation

Il est nécessaire d'avoir construit les images des étapes 2 & 4 pour effectuer cette partie. Le fichier `host` doit avoir été modifié comme décrit dans l'étape 3.

Marche à suivre :

1. Construire l'image en exécutant le script [build-image.sh](../docker-images/apache-reverse-proxy-dynamic/build-image.sh)
2. Exécuter les serveurs 
    - `docker run -d --name ajax api/apache-ajax`
    - `docker run -d --name node api/node-express`
3. Récupérer les adresses IPs des serveurs lancés
    - `docker inspect <nom> | grep -i ipaddr`
4. Exécuter le serveur :

```
docker run -d --name rp 
            -e STATIC_APP=<ip ajax>:80
            -e DYNAMIC_APP=<ip node>:3000 
            -p 8080:80 
            api/apache-reverse-proxy-dynamic
```

5. Accéder à `api.labo.ch:8080` et admirer le fonctionnement