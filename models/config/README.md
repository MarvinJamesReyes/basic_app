## Model Configs
Used to define model fields, table and entity information

### Fields
Fields are defined by a name and a field type
```
{
	name: 'myField',
	type: 'text'
}
```

Supported field types include:
* `boolean`
* `date`
* `email`
* `text`
* `timestamp`
* `uuid`

Fields can also have the following flags:
* `default` Apply a default value for the field (Currently only supports on uuids and timestamps)
* `system` Mark a field as system field. System fields are not API writable and are only populated by the system
* `primary` Mark as field as a primary key in a table
* `unique` Mark a field as unique. Data value uniqueness will be enforced at the DB level
* `calculatedFn` Defines logic for a calculated field. Functions will receive record data as the default argument

[&larr; Go Back](../../README.md)