# Readwell-v2



## Getting started

To make it easy for you to get started with this project, please read `CONTRIBUTE.md` file.

## Required Dependencies

To run this program make sure to install
- docker, docker-compose, java17, node and npm

## Run applications

**Database**

```shell
cd backend-readwell
```
```shell
docker-compose up -d
```
- to make sure the database is up run `psql -h localhost -p 5432 -U admin -d readwell-db` or `docker exec -it postgres_db psql -U admin -d readwell-db
`
- to check to see that a test table has been created `\dt`

**Spring-boot module**

```shell
cd backend-readwell
```
```shell
mvn spring-boot:run
```
- navigate to [http://localhost:8080/api/hello](http://localhost:8080/api/hello)
if you see: `["Hello from the database!"]`, it means the backend app is running


**React module**

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
  if you see:
```angular2html
Data from Spring Boot:
Hello from the database!
```
- it means the react module is connected to spring-boot module.