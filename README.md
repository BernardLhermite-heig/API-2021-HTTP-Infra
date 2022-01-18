# API-2021-HTTP-Infra

## Auteurs : Marengo Stéphane & Marzullo Loris

# Description du projet

L'objectif de ce projet est de mettre en place une infrastructure web complète ayant du contenu statique et dynamique, puis de réaliser une application web dynamique. Les différents composants de l'infrastructure web ont été `dockerisé`.

# Mise en place de l'infrastructure

Chacune des images utilisée dans ce laboratoire possède un script `build-image.sh` permettant de les construire simplement, à l'exception de la partie bonus qui utilise `docker compose`.

L'infrastructure a été mise en place en configurant les différents éléments dans l'ordre suivant :

1. [Server HTTP statique](./docs/etape1.md)
2. [Server HTTP dnyamique](./docs/etape2.md)
3. [Reverse proxy (configuration statique)](./docs/etape3.md)
4. [Requêtes AJAX](./docs/etape4.md)
5. [Reverse proxy (configuration dynamique)](./docs/etape5.md)
6. [Traefik et Portainer](./docs/bonus.md)