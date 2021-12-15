#!/bin/bash

docker build -t reverse-proxy .

read -n 1 -s -r -p "Press any key to continue"