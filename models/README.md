## Models
Defines the functions and data layer actions inherent to each entity. Models can be extended using `base-model.js`. Doing so will inherit standard core functions

### Base core functions include:
* `list` Lists all records for a given model
* `save` Saves record to the database
* `load` Loads a record using given `id` param
* `update` Updates a record with a given `id`
* `del` Deletes a recod with a given `id`
* `excludeSystemFields` Removes non api-writable system fields from a record
* `applyCalculatedFields` Resolves any calculated functions and applies their values to a record

[&larr; Go Back](../README.md)