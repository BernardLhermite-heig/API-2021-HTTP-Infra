# Objectifs

L'objectif de cette étape est de modifier le site web statique pour que ce dernier communique avec le serveur dynamique de l'étape 2 pour obtenir des informations et mettent à jour le contenu de sa page.

La communication est effectuée grâce à une requête AJAX à l'aide de JQuery.

# Configuration

## Dockerfile

Pour cette étape, nous avons effectué une copie du dossier utilisé lors de l'étape 1.

L'image est décrite dans le fichier [Dockerfile](../docker-images/apache-ajax/Dockerfile). Pour pouvoir effectuer des tests directement sur le container, nous avons rajouté à l'image l'installation de `vim` grâce à la commande suivante :
```
RUN apt-get update && apt-get install -y vim
```

## Mise en place de la requête AJAX

Un fichier [prize.js](../docker-images/apache-ajax/content/assets/js/prize.js) a été créé au même emplacement que les autres scripts utilisés par la page.

Ce dernier contient une fonction `loadPrize` qui se charge d'effectuer la requête AJAX sur l'URL `/api/prize/` et de mettre à jour le contenu de l'élément DOM possédant l'id `prize` avec le résultat de la requête.

La ligne `setInterval(loadPrize, 5000);` nous permet d'exécuter ladite fonction toutes les cinq secondes.

## Modification du HTML

Le fichier [index.html](../docker-images/apache-ajax/content/index.html) a été modifier en conséquence pour ajouter un id sur l'élément qui se met à jour périodiquement :

```
<p id="prize" [...]>[...]</p>
```

et le fichier javascript précédemment créé est ajouté à la suite des scripts déjà présent dans la page :

```
    <script src="assets/js/prize.js"></script>
```

# Nécessité du reverse proxy

Pour des raisons de sécurités, les requêtes AJAX doivent par défaut être émise depuis le même domaine pour que ces dernières fonctionnent. Grâce au `reverse proxy`, cette condition est respectée car ce dernier se charge de rediriger les requêtes et change ainsi leur domaine d'origine.

# Utilisation

Il est nécessaire d'avoir construit les images des étapes 2 & 3 pour effectuer cette partie. Le fichier `host` doit avoir été modifié comme décrit dans l'étape 3.

Il est également primordial de respecter l'ordre d'exécution décrit ci-dessous pour que l'infrastructure fonctionne correctement.

Marche à suivre :

1. Construire l'image en exécutant le script [build-image.sh](../docker-images/apache-ajax/build-image.sh)
2. Exécuter le serveur `docker run -d api/apache-ajax`
3. Exécuter le serveur de l'étape 2 `docker run -d api/express-dynamic`
4. Exécuter le serveur de l'étape 3 `docker run -d -p 8080:80 api/reverse-proxy`
    - `-p` : Le port `80` du serveur sera mappé sur le port local `8080`
    - `-d` : le container sera lancé en arrière-plan
5. Accéder à `api.labo.ch:8080` et attendre 5 secondes que la première requête soit effectuée