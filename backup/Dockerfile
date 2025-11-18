FROM postgres:17

RUN apt-get update && apt-get install -y cron

WORKDIR /app

COPY backup_postgres.sh /app/backup_postgres.sh
COPY crontab /etc/cron.d/backup-cron

RUN chmod +x /app/backup_postgres.sh
RUN chmod 0644 /etc/cron.d/backup-cron

RUN crontab /etc/cron.d/backup-cron

CMD ["cron", "-f"]
