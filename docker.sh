#!/bin/bash

docker kill espresso_run
docker rm espresso_run
docker build -t espresso_app .
docker rmi $(docker images -a | grep "^<none>" | awk '{print $3}')
docker run -it --name espresso_run --restart=always -p 80:80 -t espresso_app
