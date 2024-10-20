
# Readwell-v2 Docker Deployment Issue

## Overview

This document outlines the issues encountered when deploying the Readwell-v2 application using Docker. The setup works correctly on my local machine but fails for my teammates when using the deployment from Docker Hub.

## Local Deployment (My Setup)

### Project Structure

```
Readwell-v2
├── docker-compose.yml
├── .env
├── Dockerfile.backend-readwell
├── backend-readwell
│   ├── src/main/resources/application.yml
│   ├── Dockerfile.postgres
│   └── Dockerfile.maildev
└── frontend-readwell
└── Dockerfile
```

### Docker Images

The following images were built and pushed to Docker Hub:

- `sinke237/19-oct-24-readwell-db`
- `sinke237/frontend:v0.3`
- `sinke237/backend:v0.3`
- `sinke237/readwell-v2_mail-dev`

### Working Docker Compose File

The `docker-compose.yml` file used for local deployment is as follows:

```yaml
version: '3.8'

services:
  postgres:
    build:
      context: ./backend-readwell
      dockerfile: Dockerfile.postgres
    container_name: postgres_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    networks:
      - readwell-net

  mail-dev:
    build:
      context: ./backend-readwell
      dockerfile: Dockerfile.maildev
    container_name: readwell-mail-dev
    ports:
      - "1080:1080"
      - "1025:1025"
    networks:
      - readwell-net

  backend:
    container_name: readwell-server
    build:
      context: .
      dockerfile: Dockerfile.backend-readwell
    ports:
      - "8080:8080"
    networks:
      - readwell-net
    environment:
      ALLOWED_ORIGINS: ${ALLOWED_ORIGINS}
      SPRING_SECURITY_JWT_SECRET_KEY: ${SPRING_SECURITY_JWT_SECRET_KEY}
      SPRING_SECURITY_JWT_EXPIRATION: ${SPRING_SECURITY_JWT_EXPIRATION}
      SPRING_MAIL_HOST: ${SPRING_MAIL_HOST}
      SPRING_MAIL_PORT: ${SPRING_MAIL_PORT}
      SPRING_MAIL_USERNAME: ${SPRING_MAIL_USERNAME}
      SPRING_MAIL_PASSWORD: ${SPRING_MAIL_PASSWORD}
    depends_on:
      postgres:
        condition: service_healthy

  frontend:
    container_name: readwell-UI
    build:
      context: ./frontend-readwell
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      REACT_APP_API_URL: ${REACT_APP_API_URL}
      REACT_APP_USER_API_URL: ${REACT_APP_USER_API_URL}
    networks:
      - readwell-net

volumes:
  postgres_data:

networks:
  readwell-net:
    driver: bridge
```

The `src/main/resources/application.yml`
```env
# TODO: changes changes before production

spring:
  application:
    name: backend-readwell
    security:
      jwt:
        secret-key: ${SPRING_SECURITY_JWT_SECRET_KEY}
        expiration: ${SPRING_SECURITY_JWT_EXPIRATION}
  datasource:
    url: jdbc:postgresql://postgres:5432/${POSTGRES_DB}
    username: ${POSTGRES_USER}
    password: ${POSTGRES_PASSWORD}
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
  sql:
    init:
      mode: always
  security:
    user:
      password: test
      name: test
  mail:
    host: ${SPRING_MAIL_HOST}
    port: ${SPRING_MAIL_PORT}
    username: ${SPRING_MAIL_USERNAME}
    password: ${SPRING_MAIL_PASSWORD}
    properties:
      mail:
        smtp:
          trust: "*"
          auth: true
          starttls:
            enable: true
          connectiontimeout: 5000
          timeout: 3000
          writetimeout: 5000

cors:
  allowed-origins: "${ALLOWED_ORIGINS:http://localhost:3000,http://readwell-UI:3000}"

logging:
  level:
    org.springframework.security: DEBUG
    org.springframework.mail: DEBUG

management:
  endpoints:
    web:
      exposure:
        include: health
```

### Environment Variables

The `.env` file contains the following variables:

```env
REACT_APP_API_URL=http://10.244.55.19:8080/api
REACT_APP_USER_API_URL=http://10.244.55.19:8080/api/user
# Production Environment (You can set this when you deploy)
# REACT_APP_API_URL=https://your-production-url/api
# REACT_APP_USER_API_URL=https://your-production-url/api/user
POSTGRES_DB=readwell-db
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
SPRING_SECURITY_JWT_SECRET_KEY=xPaGg4XP2BF7t88wPCRwS78m36KQ06gf0TTjkAam/Viuvq1L2nagwW3HS36r0m/Sfjz/7ZXQjhEv9D24uVtZ2w==
SPRING_SECURITY_JWT_EXPIRATION=3600000
SPRING_MAIL_HOST=readwell-mail-dev
SPRING_MAIL_PORT=1025
SPRING_MAIL_USERNAME=clara
SPRING_MAIL_PASSWORD=clara
ALLOWED_ORIGINS=http://localhost:3000,http://readwell-UI:3000,http://10.244.55.19:3000
```

## Deployment from Docker Hub (Mates' Setup)

### Docker Compose File

The `docker-compose.yml` file used by my teammates is as follows:

```yaml
version: '3.8'

services:
  postgres:
    image: sinke237/19-oct-24-readwell-db
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    ports:
      - "5432:5432"

  frontend:
    image: sinke237/frontend:v0.3
    environment:
      - REACT_APP_API_URL=${REACT_APP_API_URL}
      - REACT_APP_USER_API_URL=${REACT_APP_USER_API_URL}
    ports:
      - "3000:3000"

  backend:
    image: sinke237/backend:v0.3
    env_file:
      - .env
    ports:
      - "8080:8080"
    command: [ "wait-for-it", "postgres:5432", "--timeout=30", "--", "java", "-jar", "target/backend-readwell-0.0.1-SNAPSHOT.jar" ]

  readwell-mail-dev:
    image: sinke237/readwell-v2_mail-dev
    environment:
      - SPRING_MAIL_HOST=${SPRING_MAIL_HOST}
      - SPRING_MAIL_PORT=${SPRING_MAIL_PORT}
      - SPRING_MAIL_USERNAME=${SPRING_MAIL_USERNAME}
      - SPRING_MAIL_PASSWORD=${SPRING_MAIL_PASSWORD}
    ports:
      - "1080:1080"
```

### Environment Variables

The `.env` file used by my teammates contains:
```yaml
# Database configuration
POSTGRES_DB=readwell-db
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin

# JWT configuration
SPRING_SECURITY_JWT_SECRET_KEY=xPaGg4XP2BF7t88wPCRwS78m36KQ06gf0TTjkAam/Viuvq1L2nagwW3HS36r0m/Sfjz/7ZXQjhEv9D24uVtZ2w==
SPRING_SECURITY_JWT_EXPIRATION=3600000

# Mail configuration
SPRING_MAIL_HOST=readwell-mail-dev
SPRING_MAIL_PORT=1025
SPRING_MAIL_USERNAME=clara
SPRING_MAIL_PASSWORD=clara

# CORS configuration
ALLOWED_ORIGINS=http://localhost:3000

# React app configuration
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_USER_API_URL=http://localhost:8080/api/user
```
Their logs show the following output:

```
2024-10-20T11:40:19.768Z  INFO 1 --- [backend-readwell] [           main] o.p.b.BackendReadwellApplication         : Successfully connected to the database.
2024-10-20T11:40:19.768Z  INFO 1 --- [backend-readwell] [           main] o.p.b.BackendReadwellApplication         : POSTGRES_DB: null
2024-10-20T11:40:19.768Z  INFO 1 --- [backend-readwell] [           main] o.p.b.BackendReadwellApplication         : POSTGRES_USER: null
2024-10-20T11:40:19.768Z  INFO 1 --- [backend-readwell] [           main] o.p.b.BackendReadwellApplication         : POSTGRES_PASSWORD: null
2024-10-20T11:40:19.768Z  INFO 1 --- [backend-readwell] [           main] o.p.b.BackendReadwellApplication         : SPRING_SECURITY_JWT_SECRET_KEY: null
2024-10-20T11:40:19.768Z  INFO 1 --- [backend-readwell] [           main] o.p.b.BackendReadwellApplication         : SPRING_SECURITY_JWT_EXPIRATION: null
2024-10-20T11:40:19.768Z  INFO 1 --- [backend-readwell] [           main] o.p.b.BackendReadwellApplication         : SPRING_MAIL_HOST: null
2024-10-20T11:40:19.768Z  INFO 1 --- [backend-readwell] [           main] o.p.b.BackendReadwellApplication         : SPRING_MAIL_PORT: null
2024-10-20T11:40:19.768Z  INFO 1 --- [backend-readwell] [           main] o.p.b.BackendReadwellApplication         : SPRING_MAIL_USERNAME: null
2024-10-20T11:40:19.768Z  INFO 1 --- [backend-readwell] [           main] o.p.b.BackendReadwellApplication         : SPRING_MAIL_PASSWORD: null
```

## Troubleshooting Steps I've made

1. **Check .env File**: Ensured that the `.env` file is correctly set up and located in the same directory as the `docker-compose.yml` file for the mates' setup.
2. **Environment Variable Loading**: Verified that the backend service is correctly loading the environment variables from the `.env` file.
    ```yaml
    docker exec use-docker-hub-deployment_backend_1 printenv
    PATH=/usr/local/openjdk-17/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
    HOSTNAME=1278bb6a64fd
    POSTGRES_DB=readwell-db
    POSTGRES_USER=admin
    POSTGRES_PASSWORD=admin
    SPRING_SECURITY_JWT_SECRET_KEY=xPaGg4XP2BF7t88wPCRwS78m36KQ06gf0TTjkAam/Viuvq1L2nagwW3HS36r0m/Sfjz/7ZXQjhEv9D24uVtZ2w==
    SPRING_SECURITY_JWT_EXPIRATION=3600000
    SPRING_MAIL_HOST=readwell-mail-dev
    SPRING_MAIL_PORT=1025
    SPRING_MAIL_USERNAME=clara
    SPRING_MAIL_PASSWORD=clara
    ALLOWED_ORIGINS=http://localhost:3000
    REACT_APP_API_URL=http://localhost:8080/api
    REACT_APP_USER_API_URL=http://localhost:8080/api/user
    JAVA_HOME=/usr/local/openjdk-17
    LANG=C.UTF-8
    JAVA_VERSION=17.0.2
    HOME=/root
    ```
3. **Docker Network**: Ensured that all services are on the same Docker network and can communicate with each other.
4. **Docker Compose Version**: Confirmed that the Docker Compose version being used is compatible with the syntax and features used in the `docker-compose.yml` files.

## Conclusion

Further investigation is needed to determine why the environment variables are not being recognized in the deployed version on Docker Hub. This issue may stem from differences in how the environment variables are loaded or passed to the containers.
```
