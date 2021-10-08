## Postgres
docker run \
    --name postgres \
    -e POSTGRES_USER=kayorenato \
    -e POSTGRES_PASSWORD=12345 \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker ps
docker exec -it postgress /bin/bash

## Painel para administrar o Postgres
docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer

## MongoDB
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=admin \
    -d \
    mongo

## Painel para administrar o MongoDB
docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

## Criando usuário no MongoDb via bash
docker exec -it mongodb \
    mongo --host localhost -u admin -p admin --authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createUser({user:'kayorenato', pwd:'12345', roles: [{role:'readWrite', db:'heroes'}]})"