#!/bin/bash
# Start MongoDB and Redis databases.

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd)"

# Initializes a MongoDB database on project_root/data/mongo/
(
  mkdir -p "${DIR}/../data/mongo"
  mongod --dbpath "${DIR}/../data/mongo" &
)

# Initializes a Redis DB server on project_root/data/db-session/
(
  mkdir -p "${DIR}/../data/redis"
  cd "${DIR}/../data/redis/"
  redis-server &
)

# On exit script kill databases
trap 'killall mongod; killall redis-server; exit' SIGINT EXIT
while true; do read; done