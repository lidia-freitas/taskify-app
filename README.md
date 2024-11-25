# Taskify Project

## Overview

This project consists of three main services:
1. **Database**: PostgreSQL database service.
2. **Server**: API server built with Node.js.
3. **Web**: Frontend web application built with React.

## Prerequisites

- Docker
- Docker Compose
- Node.js
- Yarn

## Environment Variables

Create a `.env` file in the project root with the following content:

```dotenv
DB_PORT=your_port_to_expose
API_PORT=your_server_port
WEB_PORT=your_client_port

DB_HOST=your_db_host
API_HOST=your_server_host

POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_user_password
POSTGRES_DB=your_db_name

DB_CONN=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=public
API_CONN=http://${API_HOST}:${API_PORT}
```

## Running services locally for development
___

### 1. Install Dependencies

Run the following command to install the necessary dependencies:
```sh
yarn install
```

### 2. Start the Server

Run the following command to start the database, server and web services:
```sh
yarn dev
```

## Running the server locally for production preview
___

### 1. Install Dependencies

Run the following command to install the necessary dependencies:
```sh
yarn install
```

### 2. Build the Project

Run the following command to build the project:
```sh
yarn build
```

### 3. Start the Server

Run the following command to start the server:
```sh
yarn start
```

## Running Services with Docker Compose
___

### 1. Build and start all services:
```sh
docker compose up --build -d
```

### 2. Stop services containers:
```sh
docker compose stop
```

### 3. Restart services containers:
```sh
docker compose start
```

### 4. Stop and remove all the containers, networks, and volumes:
```sh
docker compose down
```

## Health Check

The `taskify-db` service includes a health check to ensure it is ready before the `taskify-api` service starts. 
The `depends_on` condition is set to `service_healthy` to ensure the API waits for the database to be ready.

## Troubleshooting

If you encounter any issues, ensure that the environment variables are correctly set and that the services are 
properly configured to communicate over the same network.