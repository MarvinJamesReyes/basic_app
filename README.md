# Basic App

## File Structure
### Controllers
Processes requests received from the router and passes them onto the Model or services
### DB
Database layer logic. Processes requests and queries, and interacts with the DB using `Knex.js`
### Models
Defines the functions and data layer action inherent to each entity
### [Models/Config](./models/config/README.md)
Files used describe model schema and entity information
### Routes
Defines connections between the api and the controller logic
### Scripts
Script files meant to serve a specific purpose such as setup and breakdown. Typically used only when needed
### Services
Runs and configures core business logic. Components which serve a specific task or set of tasks
### Tests
Stores test files used with `Mocha`
### Validation
Defines API validation rules using `express-validator`

## Setup
### Prerequisites
* Postgres should be installed and a database should exist. You can store the DB name under `DN_NAME` for app usage
* Node, npm and/or yarn should be installed

### Config
App and DB configuration is defined in `config.js`. Values can be configured via envars
```
NODE_ENV
APP_PORT
APP_HOST
DB_USER
DB_PASS
DB_NAME
APP_PORT
APP_HOST
TEST_DB_USER
TEST_DB_PASS
TEST_DB_NAME
```

### Steps
* Once `DB_NAME` has been defined, setup tables using `node script/setup`
* Start server with `node server`

## Features
### API Functions
API calls are prefixed with `/api/:model`

* `GET /list` Lists all records for a given table
* `POST /save` Accepts a `record` object found in the `req.body`. Should describe record attributes
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
* `PUT /:id/update` Updates a stored record using a `record` object found in the `req.body`. Similar to `save`. Attributes required are typically delta changes only
```
{
	"record": {
		"constent": "My updated message"
	}
}
```
* `DELETE /:id/delete` Deletes a record based on `id`. This is a hard delete