# Objectifs

Le but de cette étape est de mettre en place un serveur HTTP dynamique permettant d'afficher une page web, le tout tournant dans un container Docker.

# Configuration

## Dockerfile

L'image liée à cette étape est décrite dans le fichier [Dockerfile](../docker-images/node-express/Dockerfile) et utilise une image `node` comme base.

 Le [Dockerfile](../docker-images/node-express/Dockerfile) comprend une instruction `COPY`, qui servira à copier les fichiers sources sur le container, ainsi qu'une instruction `CMD` qui se chargera d'exécuter le programme `index.js`.
 
## Programme index.js

Notre [programme](../docker-images/node-express/src/index.js) retourne simplement un objet JSON défini par deux attributs `name` et `value` générés aléatoirement.

# Utilisation

1. Construire l'image en exécutant le script [build-image.sh](../docker-images/node-express/build-image.sh)
2. Exécuter le container avec `docker run -d -p 8080:80 api/apache-php`
    - `-p` : Le port `80` du serveur sera mappé sur le port local `8080`
    - `-d` : le container sera lancé en arrière-plan
3. Accéder à `localhost:8080` à l'aide d'un navigateur et constater l'exécution du programme
