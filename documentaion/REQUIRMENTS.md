You are required to implement a running backend server, exposing a REST API for managing queues of messages.

The REST API:
POST /api/{queue_name}

The body is the message in JSON format.

This will place a new message in the queue named queue_name.

GET /api/{queue_name}?timeout={ms}

Gets the next message from queue_name.
Will return 204 if there’s no message in the queue after the timeout has elapsed.
If a timeout is not specified, a default of 10 seconds should be used.

Tips: 
1. Needs to work!
2. You can use any 3rd party lib/software. note that some may take time to integrate
3. Note that this is a queue. Need to act like one. (FIFO, not just.)

Tasks:
1. Initialize a new git repository.
2. Folder structure.
3. Implement the server.
4. Implement the rest API routes, controller.
5. Implement MessageQueueService with two methods: `addMessage` and `getMessage`.
6. Implement a test for the MessageQueueService.
7. Implement queue related logic.
8. Repository in memory for the queues.
9. Entity for the message.

DoD:
1. Tests
2. Documentation
3. Clean code

Submission:
Link to GitHub, send to: amirbilu@tabnine.com