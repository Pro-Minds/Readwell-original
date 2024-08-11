# Readwell-v2



## Getting started

To make it easy for you to get started with this project, please read `CONTRIBUTE.md` file.

## Required Dependencies

To run this program make sure to insta
- docker, docker-compose, java17
```shell
    npm install -g @angular/cli
```

## Run applications

**Database**

```shell
cd backend-readwell
```
```shell
docker-compose up -d
```
- to make sure the database is up run `psql -h localhost -p 5432 -U admin -d readwell-db`

**Spring-boot module**

```shell
cd backend-readwell
```
```shell
mvn spring-boot:run
```
- navigate to [http://localhost:8080/api/hello](http://localhost:8080/api/hello)
if you see: `Hello from Spring Boot!`, it means the backend app is running

**Angular module**

```shell
cd frontend-readwell
```
```shell
npm install
```
```shell
ng serve
```
- navigate to [http://localhost:4200](http://localhost:4200)
  if you see: `Hello from Spring Boot!`, it means the angular module is connected to spring-boot module.