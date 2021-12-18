# API-2021-HTTP-Infra

## Auteurs : Marengo Stéphane & Marzullo Loris

# Description du projet

# Mise en place de l'infrastructure

Chacune des images utilisée dans ce labo possède un script `build-image.sh` permettant de les construire simplement.

L'infrastructure a été mise en place en effectuant configurant les différents éléments dans l'ordre suivant :

1. [Server HTTP statique](./docs/etape1.md)
2. [Server HTTP dnyamique](./docs/etape2.md)
3. [Reverse proxy (configuration statique)](./docs/etape3.md)
4. [Requêtes AJAX](./docs/etape4.md)
5. [Reverse proxy (configuration dynamique)](./docs/etape5.md)