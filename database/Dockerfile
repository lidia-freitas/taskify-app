FROM postgres:15-alpine

COPY init.sql /docker-entrypoint-initdb.d/init.sql

EXPOSE ${DB_PORT}