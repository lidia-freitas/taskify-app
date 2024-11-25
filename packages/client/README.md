# Client Package

This README provides instructions to set up and run the client package for the project locally using Yarn scripts and Docker.

#### Prerequisites

Ensure you have the following installed on your machine:
- Node.js
- Yarn
- Docker

#### Environment Variables

Ensure the following environment variables are set in the `.env` file:

```dotenv
WEB_PORT=your_client_port
API_CONN=http://your_api_host:your_API_port
```

## Running the client locally for development
___

### 1. Install Dependencies

Run the following command to install the necessary dependencies:
```sh
yarn install
```

### 2. Start the Client

Run the following command to start the client:
```sh
yarn dev
```

## Running the client locally for production preview
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

### 3. Start the Client

Run the following command to start the client:
```sh
yarn start
```

## Running the client using Docker
___

### 1. Set the environment variables

Run the following command to load the environment variables from .env file:
```sh
source .env
```

### 2. Build the Docker Image

Run the following command to build the Docker image:
```sh
docker build \
  --build-arg API_CONN=$API_CONN \
  -t img-taskify-client:standalone .
```

### 3. Run the Client Container

Run the following command to start the client container:
```sh
docker run -d --name taskify-client-standalone \
    --env-file .env \
    -p $WEB_PORT:$WEB_PORT \
    img-taskify-client:standalone
```

### 4. Stop the Client Container

Run the following command to stop the client container:
```sh
docker stop taskify-client
```

### 5. Remove the Client Container

Run the following command to remove the client container:
```sh
docker rm taskify-client
```

## Additional Notes

- Ensure the `.env` file is correctly configured before running the client.
- The client listens on the port specified in the `WEB_PORT` environment variable.
- The API connection details are read from the `.env` file.
