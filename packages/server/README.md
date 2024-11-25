# Server Package

This README provides instructions to set up and run the server package for the project locally using Yarn scripts and Docker.

#### Prerequisites

Ensure you have the following installed on your machine:
- Node.js
- Yarn
- Docker

#### Environment Variables

Ensure the following environment variables are set in the `.env` file:

```dotenv
API_PORT=your_server_port
DB_CONN=postgresql://your_db_user:your_db_user_password@your_db_host:your_db_port/your_db_name?schema=public
```

## Running the server locally for development
___

### 1. Install Dependencies

Run the following command to install the necessary dependencies:
```sh
yarn install
```

### 2. Start the Server

Run the following command to start the server:
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

## Running the server using docker
___

### 1. Set the environment variables

Run the following command to load the environment variables from .env file:
```sh
source .env
```

### 2. Build the Docker Image

Run the following command to build the Docker image:
```sh
docker build -t img-taskify-server:standalone .
```

### 3. Run the Server Container

Run the following command to start the server container:
```sh
docker run -d --name taskify-server-standalone \
    --env-file .env \
    -p $API_PORT:$API_PORT \
    img-taskify-server:standalone
```

### 4. Stop the Server Container

Run the following command to stop the server container:
```sh
docker stop taskify-server
```

### 5. Remove the Server Container

Run the following command to remove the server container:
```sh
docker rm taskify-server
```

## Additional Notes

- Ensure the `.env` file is correctly configured before running the server.
- The server listens on the port specified in the `API_PORT` environment variable.
- The database connection details are read from the `.env` file.

