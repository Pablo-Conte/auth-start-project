#!/bin/sh
SCRIPT_DIR=$(dirname "$0")

. "$SCRIPT_DIR/loading.sh" # importando função `loading`
. "$SCRIPT_DIR/.env" # importando variáveis de ambiente

PG_VERSION="16"
CLOUD_DB_URL="postgresql://neondb_owner:wqJjGPX3S4xf@ep-ancient-forest-a4ygi3s5.us-east-1.aws.neon.tech:5432/neondb?sslmode=require" #banco de dev

# Verifica se a variável existe e não está vazia
if [ -z "$DB_DIRECT" ]; then
    echo 'Erro: A variável de ambiente "DB_DIRECT" não está definida ou está vazia.'
    exit 1
fi

LOCAL_DB_URL="${DB_DIRECT%%\?*}" # pegando a url do banco de dev e remove tudo após a `?`, incluindo ela própria # `echo "$DB_DIRECT" | sed 's/\?.*$//'`
WARNING="\n🚨 WARNING: This script will delete all data from your local database! ($LOCAL_DB_URL)"
DEPENDENCY_ALERT="\n💡 ALERT: This script depends on DOCKER and PSQL! So you need to have them installed and configured!\n"

printf "$WARNING"
printf "$DEPENDENCY_ALERT"

sleep 3

printf "\n❗️ Running Local Dump\n\n"

DROP_DB_SCHEMA="psql $LOCAL_DB_URL -c \"DROP SCHEMA public CASCADE; CREATE SCHEMA public;\""
loading "$DROP_DB_SCHEMA" \
    "Cleaning Local DB" \
    "Local DB Clear Failed ($DROP_DB_SCHEMA)" \
    "Local DB is Clear!"

RUN_PIVOT_CONTAINER="docker run --name database_dump_pivot -p 7001:5432 -e POSTGRES_USER=test -e POSTGRES_PASSWORD=test -e POSTGRES_DB=test -d postgres:$PG_VERSION"
loading "$RUN_PIVOT_CONTAINER" \
    "Running Pivot Container" \
    "Run Pivot Container Failed ($RUN_PIVOT_CONTAINER)" \
    "Pivot Container is Running!"

RUN_PG_DUMP="docker exec database_dump_pivot pg_dump $CLOUD_DB_URL | psql $LOCAL_DB_URL"
loading "$RUN_PG_DUMP" \
    "Running PG Dump" \
    "PG Dump Failed ($RUN_PG_DUMP)" \
    "PG Dump Finished Successfully!"

CLOUD_DB_URL=null # limpa a variável de ambiente para não ser utilizada acidentalmente
LOCAL_DB_URL=null

CLEAR_PIVOT_CONTAINER="docker stop database_dump_pivot && docker rm database_dump_pivot"
loading "$CLEAR_PIVOT_CONTAINER" \
    "Cleaning Pivot Container" \
    "Clear Pivot Container Failed ($CLEAR_PIVOT_CONTAINER)\n" \
    "Pivot Container and Variables are Cleaned!"
    
printf "\n"