#!/bin/bash

docker build -t api/apache-php .

read -n 1 -s -r -p "Press any key to continue"