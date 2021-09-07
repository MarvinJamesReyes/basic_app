# Basic App

Basic `Node.js` application used to store and manage messages

## Features
Stores message records into a database. Allows record actions such as `create`, `load`, `list`, `update`, and `delete`
### [API](./docs/api.md)
API calls are prefixed with `/api/:models` where the name of model is in plural

* `GET /` Lists all records for a given table
* `POST /` Saves a `record` object found in the `req.body`. Should describe record attributes
```json
{
	"record": {
		"sender": "client@email.local",
		"recipient": "company@email.local",
		"dateSent": "2021-09-01",
		"content": "This is a text message"
	}
}
```
* `GET /:id` Returns record data stored in the DB by matching the `id` value
* `PUT /:id` Updates a stored record using a `record` object found in the `req.body`. Similar to `save`. Attributes required are typically delta changes only
```json
{
	"record": {
		"content": "My updated message"
	}
}
```
* `DELETE /:id` Deletes a record based on `id`. This is a hard delete

---

## Setup
### Prerequisites
* Postgres should be installed for the database
* App database should be created. The DB name should be stored as an envar `DN_NAME` for app usage
* Node, npm and/or yarn should be installed
* Postman should be installed for API testing

### Config
App and DB configuration is defined in `config.js`. Values can be configured via envars

### Steps
* Install packages using `yarn` or `npm install`
* Ensure `DB_NAME` has been defined with your database name
* Define any other environment variables found in `config.js`, as needed
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

---

## File Structure
### [Controllers](./controllers)
Processes requests received from the router and passes them onto the model or services
### [DB](./db)
Database layer logic. Processes requests and queries, and interacts with the DB using `Knex.js`
### [Docs](./docs)
Supplementary documentation and client facing resources can be stored here
### [Models](./models)
Defines the functions and data layer actions inherent to each entity
### [Models/Config](./models/config)
Files used to describe model fields, table and entity information
### [Routes](./routes)
Defines API endpoints. Sets connections between the api, controller logic and any other middleware
### [Scripts](./scripts)
Script files meant to serve a specific task or set of tasks. Typically only used as needed
### [Services](./services)
Runs and configures core business logic. Sets of functions or classes which perform repeated logic
### [Tests](./test)
Stores test files used with `Mocha`
### [Validation](./validation)
Defines API validation rules using `express-validator`