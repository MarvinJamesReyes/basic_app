## Controllers
Processes requests received from the router and passes them onto the Model or services. Sends response from the business logic to the client
```
functionName(req, res, next) {
	try {
		// Logic
	} catch(err) { next(err) }
},
```
### Controller functions typically have the following arguments
* `req` Object representing client request. Contains data such as request param and body
* `res` Object representing server response. Sends response back to client
* `next` Calls the next middleware in the chain

[&larr; Go Back](../)