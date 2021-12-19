#!/bin/bash

docker build -t api/apache-reverse-proxy-dynamic .

read -n 1 -s -r -p "Press any key to continue"