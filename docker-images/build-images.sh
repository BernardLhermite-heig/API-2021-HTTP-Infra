#!/bin/bash

# Pour chaque sous-dossiers
for d in */ ; do
    (cd "$d" && echo "1" | ./build-image.sh) # echo "1" pour passer le Press any key
done

read -n 1 -s -r -p "Press any key to continue"