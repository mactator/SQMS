import express from "express";
import cors from "cors"; // Import CORS
import type { StreamService } from "./interface/stream_service";
import { InMemoryStreamService } from "./services/In_memory_stream_service";
import type { ScreenNumbers } from "./interface/ScreenNumbers";
import { z } from "zod";
import { Queue } from "queue-typescript";
import getRedisClient from "./util/redis";
import { RedisTicketQueue } from "services/redis_ticket_queue";
import dotenv from "dotenv";

const app = express();

dotenv.config();

// Configure CORS middleware
app.use(cors());
app.use(express.json());

// Stream services for counters and queues
const currentCustomerStream: StreamService<ScreenNumbers> =
  new InMemoryStreamService();
const queueStream: StreamService<Queue<Ticket>> = new InMemoryStreamService();

const displayRecord: ScreenNumbers = {
  // c1: 0,
  // c2: 0,
  // c3: 0,
  // c4: 0,
};

// Define notifySchema for validating input
const notifySchema = z.object({
  ticket: z.object({
    number: z.number(),
  }),
  counter: z.string(),
});

// Ticket type definition
export type Ticket = {
  number: number;
};

const redisClient = await getRedisClient();
const ticketQueueService = new RedisTicketQueue(redisClient);

// Stream current queue to connected clients
app.get("/stream-queue", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Fetch the initial state of the queue
  const tickets = await ticketQueueService.getQueue();
  const queue = new Queue<Ticket>();
  tickets.forEach((ticket) => queue.enqueue(ticket)); // Convert array to Queue
  res.write(`data: ${JSON.stringify(queue.toArray())}\n\n`);

  const unsubscribe = queueStream.subscribe((updatedQueue) => {
    res.write(`data: ${JSON.stringify(updatedQueue.toArray())}\n\n`);
  });

  req.on("close", () => {
    unsubscribe();
    console.log("Client disconnected from /stream-queue");
  });
});

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send the initial state of displayRecord
  res.write(`data: ${JSON.stringify(displayRecord)}\n\n`);

  const unsubscribe = currentCustomerStream.subscribe((e) => {
    res.write(`data: ${JSON.stringify(e)}\n\n`);
  });

  req.on("close", () => {
    unsubscribe();
    console.log("Client disconnected from /stream");
  });
});

// Notify queue updates by fetching the latest queue from Redis
app.post("/notify-queue", async (req, res) => {
  const tickets = await ticketQueueService.getQueue();
  const queue = new Queue<Ticket>();
  tickets.forEach((ticket) => queue.enqueue(ticket)); // Convert array to Queue
  queueStream.notify(queue);
  res.json("ok");
});

// Notify counter updates
app.post("/notify", (req, res) => {
  const data = notifySchema.parse(req.body);

  displayRecord[data.counter] = data.ticket.number;
  currentCustomerStream.notify(displayRecord);

  res.json("ok");
});

// Start the server
app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
