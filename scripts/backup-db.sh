#!/bin/bash
# Script de backup para MySQL
# Ejecutar con cron: 0 2 * * * /path/to/backup-db.sh

BACKUP_DIR="/backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
CONTAINER_NAME="techno-hogar-db"

# Crear directorio si no existe
mkdir -p $BACKUP_DIR

# Crear backup
docker exec $CONTAINER_NAME mysqldump -u root -p"$MYSQL_ROOT_PASSWORD" techno_hogar > "$BACKUP_DIR/backup_$DATE.sql"

# Comprimir
gzip "$BACKUP_DIR/backup_$DATE.sql"

# Eliminar backups mayores a 7 días
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "Backup completado: backup_$DATE.sql.gz"