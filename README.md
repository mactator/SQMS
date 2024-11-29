Overview
This project is a Simple Queue Management System designed to manage customer flow in a service environment. It includes:

Ticket Dispenser: Allows multiple users to get tickets securely.
Waiting Room Display: Displays which ticket is being served at each counter.
Stream Service: Provides real-time updates to the waiting room display.
Redis Integration: Ensures secure and atomic ticket handling using Redis for queue operations.
System Components
Simple Queue Management Server (SQMS):

Handles ticket dispensing.
Manages ticket queue operations (enqueue and dequeue).
Routes:
/queue (POST): Dispenses tickets.
/queue/next (GET): Fetches the next ticket to be served.
Stream Service:

Manages real-time updates for the waiting room displays.
Routes:
/stream (GET): Streams updates to clients.
/notify (POST): Notifies changes to counters (e.g., when a new ticket is being served).
Redis Server:

Used for:
Securely incrementing ticket numbers.
Managing the queue with enqueue and dequeue operations.
Project Flow
Ticket Dispensing:

Users request a ticket via the /queue route.
The system securely increments the ticket number using Redis and adds the ticket to the queue.
Queue Handling:

Counters fetch the next ticket to serve via the /queue/next route.
Real-Time Updates:

When a counter starts serving a ticket, it calls the /notify route in the Stream Service.
The Stream Service broadcasts the update to all connected waiting room displays via the /stream route.
Waiting Room Display:

Displays current ticket being served at each counter.
Refreshes dynamically based on the Stream Service updates.
