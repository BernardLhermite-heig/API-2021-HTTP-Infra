# Objectifs

Le but de cette étape est de mettre en place un serveur HTTP statique permettant d'afficher une page web, le tout tournant dans un container Docker.

# Configuration

## Dockerfile

L'image liée à cette étape est décrite dans le fichier [Dockerfile](../docker-images/apache-php/Dockerfile) et utilise une image `php` comme base, intégrant ainsi `apache` et l'interpréteur `php`.

 Le [Dockerfile](../docker-images/apache-php/Dockerfile) ne comprend qu'une instruction `COPY`, qui servira à copier les fichiers sources sur le container, en plus de l'instruction `FROM`.

## Configuration apache

La configuration `apache` se trouve dans divers fichiers à l'emplacement suivant (dans le container) : `/etc/apache2/`

Nous avons décidé d'utiliser la configuration de base, impliquant que nos fichiers sources devront être copiés dans le dossier `/var/www/html/` du container.

Ce chemin pourrait être modifié en éditant le fichier de configuration du site utilisé (`/etc/apache2/sites-enabled/000-default.conf`) et en changeant la valeur `DocumentRoot` pour pointer vers un autre dossier.

## Page web

Notre page web est basée sur [un template](https://onepagelove.com/basic-lite) trouvé en ligne que nous avons modifié à notre gout. Les fichiers sont situés dans le dossier [content](../docker-images/apache-php/content/).

# Utilisation

1. Construire l'image en exécutant le script [build-image.sh](../docker-images/apache-php/build-image.sh)
2. Exécuter le container avec `docker run -d -p 8080:80 api/apache-php`
    - `-p` : Le port `80` du serveur sera mappé sur le port local `8080`
    - `-d` : le container sera lancé en arrière-plan
3. Accéder à `localhost:8080` à l'aide d'un navigateur et admirer la magnifique page web