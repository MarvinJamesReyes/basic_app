## Routes
Defines connections between the api and the controller logic. Assigns middleware to routes as needed
```
router.post('/example', validator.fn, ...otherMiddleware, controller.fn);
```

### Typical API routes include:
* `GET /` Lists all records
* `POST /` Saves a record
* `GET /:id` Loads a single record
* `PUT /:id` Updates a single record
* `DELETE /:id` Deletes a single record

[&larr; Go Back](../README.md)