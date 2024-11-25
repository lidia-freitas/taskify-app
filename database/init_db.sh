#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  set -o allexport
  source .env
  set +o allexport
fi

# Create the user and database
psql -U postgres -d postgres -c "CREATE USER ${POSTGRES_USER} WITH ENCRYPTED PASSWORD '${POSTGRES_PASSWORD}';" 2>/dev/null || true
psql -U postgres -d postgres -c "CREATE DATABASE ${POSTGRES_DB} WITH OWNER ${POSTGRES_USER};" 2>/dev/null || true

# Execute the init.sql script
echo "Executing the init.sql script"
psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" -f "./database/init.sql"

echo "Database initialization script completed."
