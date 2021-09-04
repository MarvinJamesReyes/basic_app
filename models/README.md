## Models
Defines the functions and data layer actions inherent to each entity

### Core functions include:
* `save` Saves record to the database
* `load` Loads a record using given `id` param
* `list` Lists all records for a given model
* `update` Updates a record with a given `id`
* `del` Deletes a recod with a given `id`
* `excludeSystemFields` Removes non api-writable system fields from a record
* `applyCalculatedFields` Resolves any calculated functions and applies their values to a record

[&larr; Go Back](../README.md)