## DB
Database layer logic. Processes requests and queries, and interacts with the DB using `Knex.js`

### Core functions include:
* `list` Lists all records for a given table
* `insert` Inserts a record into a table
* `load` Loads a record using given `id` param
* `update` Updates a record with a given `id`
* `del` Deletes a record with a given `id`
* `createTable` Creates a table in db with a given `tableName` and `fields`
* `dropTable` Drops a table using a given `tableName`

### Knex DB configuration is defined in `config.js`. Development uses the following envars
* `APP_HOST` App hosting location IP
* `DB_USER` Database username
* `DB_PASS` Database password
* `DB_NAME`	Database name

[&larr; Go Back](../README.md#db)