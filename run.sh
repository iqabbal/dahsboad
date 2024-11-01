#!/bin/bash

# Clone https://github.com/apache/superset.git
if [ ! -d "superset" ]; then
    git clone https://github.com/apache/superset.git && rm -rf superset/.git
fi

if ! [ -x "$(command -v docker-compose)" ]; then
    echo "Error: docker-compose is not installed." >&2
    sudo docker compose up -d --build 
    exit 1
fi
sudo docker-compose up -d --build
