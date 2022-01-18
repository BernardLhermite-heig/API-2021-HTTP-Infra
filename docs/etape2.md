# Objectifs

Le but de cette étape est de mettre en place un serveur HTTP dynamique permettant d'afficher une page web, le tout tournant dans un container Docker.

# Configuration

## Dockerfile

L'image liée à cette étape est décrite dans le fichier [Dockerfile](../docker-images/node-express/Dockerfile) et utilise une image `node` comme base.

 Le [Dockerfile](../docker-images/node-express/Dockerfile) défini pour commencer une instruction `WORKDIR /usr/src/app`, nous permettant de définir le répertoire du travail et ainsi éviter de devoir spécifier l'entier du chemin dans les commandes suivantes.

 Comme précédemment, la commande `COPY` permet de copier les fichiers sources nécessaires au bon fonctionnement de l'application.

 La suivante, `RUN ["npm", "install"]`, va permettre d'installer les différentes dépendances requises par notre programme. Ces dernières sont définies dans le fichier [package.json](../docker-images/node-express/src/package.json). Grâce à cela, nous n'avons pas besoin d'installer `npm` sur notre machine locale.

 La dernière instruction `CMD ["node", "index.js"]` permet d'exécuter notre programme.
 
## Application

Notre [application](../docker-images/node-express/src/index.js) définit un serveur HTTP à l'aide d'[express](https://expressjs.com/), à l'écoute sur le port `3000` :

``` javascript
var express = require('express');
var app = express();

app.listen(3000, function() {
	console.log('Accepting HTTP requests on port 3000.');
});
```

 Lorsqu'une requête `GET` survient à la racine (`/`) un objet `JSON`, défini par deux attributs `name`et `value`, est envoyé en réponse : 

``` javascript
app.get('/', function(req, res) {
	res.send(getPrize());
});
```

Les valeurs dedits attributs sont générés aléatoirement à l'aide du générateur [Chance](https://chancejs.com/) :

``` javascript
var Chance = require('chance');
var chance = new Chance();

function getPrize() {
	return {
		name: chance.word({ syllables: 3 }),
		value: chance.euro({min : 10, max: 1000000})
	}
}
```

# Utilisation

1. Construire l'image en exécutant le script [build-image.sh](../docker-images/node-express/build-image.sh)
2. Exécuter le container avec `docker run -d -p 3000:3000 api/node-express`
    - `-p` : Le port `3000` du serveur sera mappé sur le port local `3000`
    - `-d` : le container sera lancé en arrière-plan
3. Accéder à `localhost:3000` à l'aide d'un navigateur et constater l'exécution du programme
