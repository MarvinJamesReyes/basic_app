## Tests
Stores test files used with `Mocha`. Test folders are structured as follows:

### Fixture
Defines test database and model configs. Used to create tables for test database.

### Integration
Set of tests used to test functionality of different components working together. Contains tests for base components such as `base-controller` and `base-model`. Tests for extended components can go here as well

### Postman
Export of `Postman` tests used to test API calls. Contains `json` files used to import into `Postman`

### Unit
Set of tests used to test functionality of individual components. This includes test for services and db layer actions

---

### Steps
* Ensure `TEST_DB_NAME` has been defined with your database name
* Ensure a database exists with the defined `TEST_DB_NAME`
* Build your test tables using the flag `-t`
```
sh run.sh -c setup -t
```
* Run mocha tests. Tests ran through `run.sh` should ensure `NODE_ENV=test`
```
sh run.sh -c test
```

[&larr; Go Back](../README.md#tests)