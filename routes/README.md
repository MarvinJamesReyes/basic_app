## Routes
Defines connections between the api and the controller logic. Assigns middleware to routes as needed
```
router.post('/example', validator.fn, ...otherMiddleware, controller.fn);
```

### Typical API routes include:
* `POST /save`
* `GET /:id`
* `GET /list`
* `PUT /:id/update`
* `DELETE /:id/delete`

[&larr; Go Back](../)