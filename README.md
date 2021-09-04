# Basic App

## File Structure
### [Controllers](./controllers)
Processes requests received from the router and passes them onto the Model or services
### [DB](./db)
Database layer logic. Processes requests and queries, and interacts with the DB using `Knex.js`
### [Models](./models)
Defines the functions and data layer actions inherent to each entity
### [Models/Config](./models/config)
Files used to describe model fields, table and entity information
### [Routes](./routes)
Defines connections between the api and the controller logic
### [Scripts](./scripts)
Script files meant to serve a specific task or set of tasks. Typically only used as needed
### [Services](./services)
Runs and configures core business logic. Sets of functions or classes which perform repeated logic
### [Tests](./test)
Stores test files used with `Mocha`
### [Validation](./validation)
Defines API validation rules using `express-validator`

---

## Setup
### Prerequisites
* Postgres should be installed and a database should exist. You can store the DB name under `DN_NAME` for app usage
* Node, npm and/or yarn should be installed

### Config
App and DB configuration is defined in `config.js`. Values can be configured via envars

### Steps
* Ensure `DB_NAME` has been defined with your database name
* Ensure a database exists with the defined `DB_NAME`
* Build your app tables
```
sh run.sh -c setup
```
* Start server to listen for API calls
```
node server
```

---

## Features
### API Functions
API calls are prefixed with `/api/:models` where the name of model is in plural

* `GET /` Lists all records for a given table
* `POST /` Saves a `record` object found in the `req.body`. Should describe record attributes
```
{
	"record": {
		"sender": "client@email.local".
		"recepient": "company@email.local",
		"dateSent": "2021-09-01",
		"content": "This is a text message"
	}
}
```
* `GET /:id` Returns record data stored in the DB by matching the `id` value
* `PUT /:id` Updates a stored record using a `record` object found in the `req.body`. Similar to `save`. Attributes required are typically delta changes only
```
{
	"record": {
		"constent": "My updated message"
	}
}
```
* `DELETE /:id` Deletes a record based on `id`. This is a hard delete


### Commands
The project was coded on a `Windows` machine, so unfortunately there is no convenient `Makefile`. Instead there is a `run.sh` file which can run basic commands.
```
sh run.sh -c setup
```
* `-c` Flag should be followed by command name
* `-t` Flag denotes test environment. Commands which can be test specific will run under test specifications
* `setup` Using model configs, will create database tables
* `breakdown` Using list of models, will drop database tables
* `lint` Will lint project using `eslint`
* `test` Will run tests using `mocha`. Automatically runs with `NODE_ENV=test`