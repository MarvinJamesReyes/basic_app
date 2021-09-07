## Model Configs
Files used to describe model fields, table and entity information

### Fields
Fields are defined by a name and a field type
```javascript
{
	name: 'myField',
	type: 'text'
}
```

#### Supported field types include:
* `boolean` True or False values
* `date` Stores a date, typically in ISO8601
* `email` A text value in email format
* `text` Stores text values
* `timestamp` A timestamp in miliseconds
* `uuid` A unique id in uuid v4

#### Fields can also have the following flags:
* `default` Apply a default value for the field (Currently only supports on uuids and timestamps)
* `system` Mark a field as system field. System fields are not API writable and are only populated by the system
* `primary` Mark as field as a primary key in a table
* `unique` Mark a field as unique. Data value uniqueness will be enforced at the DB level
* `calculatedFn` Defines logic for a calculated field. Functions will receive record data as the default argument

[&larr; Go Back](../../README.md#modelsconfig)