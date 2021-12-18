#!/bin/bash

docker build -t api/express-dynamic .

read -n 1 -s -r -p "Press any key to continue"