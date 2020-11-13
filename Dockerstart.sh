#!/bin/sh
set -e

if [ -d /data/db ]; then
  mkdir -p /data/dbs
  mv /data/db /data/dbs/users
  echo "Migrated database"
fi

npm start