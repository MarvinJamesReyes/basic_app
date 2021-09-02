# Basic Message App

## File Structure

### controllers
Processes requests received from the router and passes them onto the Model or services

### db
Database layer logic. Processes requests and queries, and sends them the DB using `Knex.js`

### models
Defines the functions and data layer action inherent to each entity

#### config
Files used describe model schema and entity information

### plugins
Components which serve a specific task or set of tasks. Classes which can be intantiated for use

### routes
Defines connections between the api and the controller logic

### scripts
Script files meant to serve a specific purpose such as setup and breakdown. Typically used only when needed

### services
Runs and configures core business logic. Configuration of plugins and data layer settings go here

### test
Stores test files used with `Mocha`

### validation
Defines API argument validation using `express-validator`