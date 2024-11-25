# Database README

This README provides instructions to set up and run the database for the project locally using the `init_db.sh` script or Docker.

#### Prerequisites

Ensure you have the following installed on your machine:
- Docker

#### Environment variables

Ensure the following environment variables are set in the `.env` file:

```dotenv
DB_PORT=your_port_to_expose
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_user_password
POSTGRES_DB=your_db_name
```

## Running the database locally using `init_db.sh` script
___

### 1. Run the initialization script:

Run the following command to initialize the database:
```sh
./init_db.sh
```

## Running the database using Docker
___

### 1. Set the environment variables

Run the following command to load the environment variables from .env file:
```sh
source .env
```

### 2.  Build the Docker image

Run the following command to build the Docker image:
```sh
docker build -t img-taskify-db:standalone .
```

### 3. Run the database container

Run the following command to start the database container:
```sh
docker run -d --name taskify-db-standalone \
   --env-file .env \
   -p $DB_PORT:$DB_PORT \
   -v taskify_database_data_standalone:/var/lib/postgresql/data \
   img-taskify-db:standalone
```

### 4. Stop the database container

Run the following command to stop the server container:
```sh
docker stop taskify-db-standalone
```

### 5. Remove the database container

Run the following command to remove the server container:
```sh
docker rm taskify-db-standalone
```

## Additional Notes

- Ensure the `.env` file is correctly configured before running the database.
- The `init.sql` script is automatically executed on `init_db.sh` script or on database container starts for the first time when using Docker.
- The database data is persisted in the `taskify_database_data_standalone` volume when using Docker.
