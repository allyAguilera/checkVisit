#!/bin/bash
set -e

# Fecha
FECHA=$(date +"%Y-%m-%d_%H-%M-%S")

USER="allysonaguilera"
DB="checkvisit"
HOST="db"   
DESTINO="/backups"

mkdir -p $DESTINO

# Archivo final
ARCHIVO="$DESTINO/backup-$DB-$FECHA.sql.gz"

# Ejecutamos backup
pg_dump -h $HOST -U $USER $DB | gzip > $ARCHIVO

echo "Backup generado: $ARCHIVO"
