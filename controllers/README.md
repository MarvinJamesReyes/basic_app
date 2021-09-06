## Controllers
Processes requests received from the router and passes them onto the model or services. Sends response from the business logic to the client. Controllers can be extended using `base-controller.js`. Doing so will inherit standard core functions

### Base core functions include:
* `list` Lists all records for a given model
* `save` Saves record to the database
* `load` Loads a record using given `id` param
* `update` Updates a record with a given `id`
* `del` Deletes a recod with a given `id`

### Controller functions typically have the following arguments:
```javascript
functionName(req, res, next) {
	try {
		// Logic
	} catch(err) { next(err) }
}
```
* `req` Object representing client request. Contains data such as request param and body
* `res` Object representing server response. Sends response back to client
* `next` Calls the next middleware in the chain. In this case, errors are passed to the `errorHandler`

### Request responses
Responses should always return two things:
* Status code, such as `2xx`, `4xx`, or `5xx`
* A `JSON` object containing relevent response data or error information. This can have the following keys:
	* `message` Describes the result of the response. Only for successful responses
	* `results` Relevant data related to the request
	* `error` Error information should the request fail

For example a `save` request will return status `201`
```json
{
	"message": "Record saved",
	"results": "<UUID of record>"
}
```
A `load` might look like this `200`
```json
{
	"message": "Record loaded",
	"results": {
		"field1": "value1",
		"field2": "value2"
	}
}
```
While an `error` would look like so `400`
```json
{
	"error": "Error message"
}
```

[&larr; Go Back](../README.md)