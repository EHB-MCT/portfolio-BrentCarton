# User Tracking System

The User Tracking System is a project that allows you to track users in different rooms and visualize user counts using TouchDesigner (version 2021.15800).

## Table of Contents
- [User Tracking System](#user-tracking-system)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Installation and Setup](#installation-and-setup)
  - [Running with Docker](#running-with-docker)
  - [Usage](#usage)
  - [Visualizing User Count in TouchDesigner](#visualizing-user-count-in-touchdesigner)
  - [API Documentation](#api-documentation)
    - [Base URL](#base-url)
    - [Endpoints](#endpoints)
      - [Users](#users)
      - [Room 1](#room-1)
      - [Room 2](#room-2)
      - [Room 3](#room-3)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

The User Tracking System project consists of the following components:

- Controllers for managing users and rooms.
- Models for interacting with the PostgreSQL database.
- Express routes for handling API requests.
- Docker Compose configuration for containerized deployment.
- Error handling middleware.
- OSC communication setup.
- Database connection configuration.
- Environment variables setup.
- Unit tests for routes and models.

## Features

- Create, retrieve, update, and delete users and room data.
- Track users in different rooms and calculate their duration.
- Use Open Sound Control (OSC) to communicate room statistics.
- Use Docker for containerized deployment.
- Error handling and middleware for centralized error handling.
- Environment variable setup using `.env` files.
## Installation and Setup

1. **Install Node.js and npm:** Download and install them from [https://nodejs.org/](https://nodejs.org/).

2. **Install PostgreSQL:** Download and install it from [https://www.postgresql.org/download/](https://www.postgresql.org/download/).

3. **Set up environment variables:**

   - Create a `.env` file in the project root directory.
   - Add the following environment variables to the `.env` file:

     ```plaintext
     PORT=3000
     OSC_CLIENT_HOST=your_osc_client_host
     OSC_CLIENT_PORT=7000
     TABLE_USERS=users
     TABLE_ROOM1=room1
     TABLE_ROOM2=room2
     TABLE_ROOM3=room3
     ```

     Replace `your_osc_client_host` with your ip.

## Running with Docker

To run the project using Docker, follow these steps:

1. **Install Docker:** Download and install Docker from [https://www.docker.com/get-started](https://www.docker.com/get-started).

2. **Build Docker Image:**

   Build the Docker image for the project:

   ```bash
   docker-compose up --build

## Usage

The User Tracking System exposes API endpoints for managing users and rooms. You can interact with the API using tools like curl, Postman, or your preferred API client. A Postman template has been included in the repository for your convenience.

For detailed API documentation, please refer to the [API Documentation](#api-documentation) section.

## Visualizing User Count in TouchDesigner

The purpose of this project is to track users in different rooms. To visualize the user count in each room using TouchDesigner, follow these steps:

1. Open the included TouchDesigner project.
2. Inside the OSC In node, change the IP to the same IP as in the `.env` file.
3. If you're using the default IP address (127.0.0.1), ensure that the Node.js application and TouchDesigner are running on the same machine. If not, specify the appropriate IP address.

## API Documentation

### Base URL

The base URL for all API endpoints is: `http://localhost:3000/api`

### Endpoints

#### Users

- **Create User**
  - Method: POST
  - Endpoint: `/user`
  - Request Body:
    ```json
    {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com"
    }
    ```
  
- **Get Users**
  - Method: GET
  - Endpoint: `/user`

- **Update User**
  - Method: PUT
  - Endpoint: `/user/:id`
  - Request Body:
    ```json
    {
      "first_name": "Updated",
      "last_name": "User",
      "email": "updated@example.com"
    }
    ```
  
- **Delete User**
  - Method: DELETE
  - Endpoint: `/user/:id`

#### Room 1

- **Create Room 1 User**
  - Method: POST
  - Endpoint: `/room1`
  - Request Body:
    ```json
    {
      "user_id": 1
    }
    ```
  
- **Get Room 1 Users**
  - Method: GET
  - Endpoint: `/room1`

- **Delete Room 1 User**
  - Method: DELETE
  - Endpoint: `/room1`

#### Room 2

- **Create Room 2 User**
  - Method: POST
  - Endpoint: `/room2`
  - Request Body:
    ```json
    {
      "user_id": 2
    }
    ```
  
- **Get Room 2 Users**
  - Method: GET
  - Endpoint: `/room2`

- **Delete Room 2 User**
  - Method: DELETE
  - Endpoint: `/room2`

#### Room 3

- **Create Room 3 User**
  - Method: POST
  - Endpoint: `/room3`
  - Request Body:
    ```json
    {
      "user_id": 3
    }
    ```
  
- **Get Room 3 Users**
  - Method: GET
  - Endpoint: `/room3`

- **Delete Room 3 User**
  - Method: DELETE
  - Endpoint: `/room3`

## Contributing

Contributions are welcome! If you'd like to contribute to the User Tracking System project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and write tests if necessary.
4. Submit a pull request to the main branch.

## License

This project is licensed under the MIT License.

