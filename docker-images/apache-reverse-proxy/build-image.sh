#!/bin/bash

docker build -t api/apache-reverse-proxy .

read -n 1 -s -r -p "Press any key to continue"