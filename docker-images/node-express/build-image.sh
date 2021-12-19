#!/bin/bash

docker build -t api/node-express .

read -n 1 -s -r -p "Press any key to continue"