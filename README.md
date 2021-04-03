## Description

NestJS + TypeORM + JWT Authentication/Authorization starter

## Installation

```bash
$ npm install
```

## Environment variables

For development purposes `.env` file can be used.

#### App variables

`PORT` - Server port. Default `3030`.

#### Auth variables

`AUTH_TOKEN_EXPIRES_IN` - Token expiration time in seconds. Default `3600`.

`AUTH_TOKEN_SECRET` - Token secret string.

`AUTH_TOKEN_COOKIE_NAME` - Cookie name to store token in. Default `jwt`.

#### DB variables

`DB_ENTITIES_PATH` - Relative to root path to TypeORM entities. Default `/dist/modules/**/*.entity{.ts,.js}`.

`DB_HOST` - Database host.

`DB_PORT` - Database port. Default `5432`.

`DB_SCHEMA` - Database schema. Default `public`.

`DB_NAME` - Database name.

`DB_USERNAME` - Database username.

`DB_PASSWORD` - Database password.

## Seeding the DB

```bash
$ npm run db-sync
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Run docker container for development purposes

```bash
docker run -d --name {CONTAINER_NAME}\
    -e POSTGRES_USER={DB_USERNAME}\
    -e POSTGRES_PASSWORD={DB_PASSWORD} \
    -v {ABSOLUTE_DB_FOLDER_PATH_TO_PERSIST_IN}:/var/lib/postgresql/data \
    -p {DB_PORT}:5432 \
    'postgres:12'
``` 

Create DB and schema in created postgres container:

```bash
docker exec -it {CONTAINER_NAME} psql -U {DB_USERNAME} -c 'CREATE DATABASE "{DB_NAME}";'
```

Example:
```bash
docker run -d --name test-db-container \
    -e POSTGRES_USER=admin \
    -e POSTGRES_PASSWORD=p@ssw0rd \
    -v /path/.db:/var/lib/postgresql/data \
    -p 30032:5432 \
    'postgres:12'

docker exec -it test-db-container psql -U admin -c 'CREATE DATABASE "test-db";'
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
