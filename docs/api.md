# API and Resources

## Messages
Stores messages sent between users. The message API handles record actions on stored or new messages

### Endpoints

---

#### GET
```
/api/messages
```
Get a list of all messages stored in the database
#### Headers
`Content-Type:application/json`
#### Path Parameters
None
#### Request Body
None
#### Response Parameters
Name | Type | Description
---|---|---
message | string | Displays message text on success
results | array | Displays list of records
error | string | Displays error text on failure

##### Example
```json
{
	"message": "List of records",
	"results": [
		{
			"id": "5f9eeb03-3aa0-4132-a645-d83c5fdcedd1",
			"date_created": "2021-09-06T15:28:42.845Z",
			"date_updated": "2021-09-06T15:28:42.843Z",
			"sender": "client@email.local",
			"recipient": "service@corp.local",
			"content": "Hello, this is a message",
			"date_sent": "2021-09-01T04:00:00.000Z",
			"is_palindrome": false
		},
		{
			"id": "89cc3c8c-2c59-454a-a9e6-14c873e7d777",
			"date_created": "2021-09-06T15:28:43.720Z",
			"date_updated": "2021-09-06T15:29:52.013Z",
			"sender": "client@email.local",
			"recipient": "service@corp.local",
			"content": "civic",
			"date_sent": "2021-09-01T04:00:00.000Z",
			"is_palindrome": true
		}
	]
}
```

---

#### POST
```
/api/messages
```
Stores a message into the database using data from request `body`
#### Headers
`Content-Type:application/json`
#### Path Parameters
None
#### Request Body
Name | Type | Required/Optional | Description
---|---|---|---
record | JSON | Required | Contains the fields and attributes of a message record
record.sender | string | Required | Email of user which sent the message. Must follow `email` format
record.recipient | string | Required | Email of user which received the message. Must follow `email` format
record.dateSent | string | Required | Date message was sent to recipient. Must follow `ISO8601` format
record.content | string | Required | Text content of message

##### Example
```json
{
	"record": {
		"sender": "client@email.local",
		"recipient": "service@corp.local",
		"dateSent": "2021-09-02",
		"content": "Hello, this is a message"
	}
}
```
#### Response Parameters
Name | Type | Description
---|---|---
message | string | Displays message text on success
results | string | Displays the `id` of the saved record
error | string | Displays error text on failure

##### Example
```json
{
	"message": "Record saved",
	"results": "5f9eeb03-3aa0-4132-a645-d83c5fdcedd1"
}
```

---

#### GET
```
/api/messages/:id
```
Loads a stored message from the database using its database `id`
#### Headers
`Content-Type:application/json`
#### Path Parameters
Name | Description
---|---
id | The `uuid` of the message resource stored in the database

#### Request Body
None
#### Response Parameters
Name | Type | Description
---|---|---
message | string | Displays message text on success
results | object | Displays the returned resource as an `object`
results.is_palindrome | boolean | Calculated field which returns `true` if content is a palindrome
error | string | Displays error text on failure

##### Example
```json
{
	"message": "Record loaded",
	"results": {
		"id": "5f9eeb03-3aa0-4132-a645-d83c5fdcedd1",
		"date_created": "2021-09-06T16:00:12.079Z",
		"date_updated": "2021-09-06T16:00:12.079Z",
		"sender": "client@email.local",
		"recipient": "service@corp.local",
		"content": "Hello, this is a message",
		"date_sent": "2021-09-01T04:00:00.000Z",
		"is_palindrome": false
	}
}
```

---

#### PUT
```
/api/messages/:id
```
Updated a stored message using data from request `body` and the resource `id`
#### Headers
`Content-Type:application/json`
#### Path Parameters
Name | Description
---|---
id | The `uuid` of the message resource stored in the database

#### Request Body
Name | Type | Required/Optional | Description
---|---|---|---
record | JSON | Required | Contains the fields and attributes of a message record
record.sender | string | Optional | Email of user which sent the message. Must follow `email` format
record.recipient | string | Optional | Email of user which received the message. Must follow `email` format
record.dateSent | string | Optional | Date message was sent to recipient. Must follow `ISO8601` format
record.content | string | Optional | Text content of message

##### Example
```json
{
	"record": {
		"content": "racecar"
	}
}
```
#### Response Parameters
Name | Type | Description
---|---|---
message | string | Displays message text on success
results | string | Displays the `id` of the updated record
error | string | Displays error text on failure

##### Example
```json
{
	"message": "Record updated",
	"results": "5f9eeb03-3aa0-4132-a645-d83c5fdcedd1"
}
```

---

#### DELETE
```
/api/messages/:id
```
Deletes a stored message from the database using its database `id`
#### Headers
`Content-Type:application/json`
#### Path Parameters
Name | Description
---|---
id | The `uuid` of the message resource stored in the database

#### Request Body
None
#### Response Parameters
Name | Type | Description
---|---|---
message | string | Displays message text on success
results | string | Displays the `id` of the deleted record
error | string | Displays error text on failure

##### Example
```json
{
	"message": "Record deleted",
	"results": "5f9eeb03-3aa0-4132-a645-d83c5fdcedd1"
}
```

[&larr; Go Back](../README.md)