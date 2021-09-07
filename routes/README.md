## Routes
Defines API endpoints. Sets connections between the api, controller logic and any other middleware
```javascript
router.post('/example', validator.fn, ...otherMiddleware, controller.fn.bind(controller));
```
Due to the nature of controllers being instances, they must be bound to call individual functions

### Typical API routes include:
* `GET /` Lists all records
* `POST /` Saves a record
* `GET /:id` Loads a single record
* `PUT /:id` Updates a single record
* `DELETE /:id` Deletes a single record


[&larr; Go Back](../README.md#routes)