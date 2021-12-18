#!/bin/bash

docker build -t api/apache-static .

read -n 1 -s -r -p "Press any key to continue"