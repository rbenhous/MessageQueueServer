# MessageQueueServer
TabNine assignment - server for managing queues of messages.

## Installation
1. Install npm required packages
```bash
npm install
```
2. Create .env file in the root directory and add the following environment variables:
```bash
PORT = 3000
MAX_QUEUE_SIZE = 100
DEFAULT_TIMEOUT = 10
```

## Running the app
```bash
# development
npm run start
```

## Endpoints
### POST /api/{queue_name}
This will place a new message in the queue named queue_name.
- 201 - if the message was added successfully.
- 400 - if the message is invalid.
- 409 - (conflict) if the queue is full (Queue overflow).
#### Request body aka message
```json
{
    "message": "Hello World!",
    "timestamp": 1633660800000,
    "priority": 1,
    "name": "John Doe"
}
```

### GET /api/{queue_name}?timeout={ms}
Gets the next message from queue_name.
- 200 -  if the message was retrieved successfully.
- 204 - if there’s no message in the queue after the timeout has elapsed. (Queue underflow)
- 404 if the queue doesn't exist.
- If a timeout is not specified, a default of 10 seconds should be used.
