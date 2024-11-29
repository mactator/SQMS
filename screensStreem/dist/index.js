import express from "express";
import { InMemoryStreamService } from "./services/In_memory_stream_service.js";
import { z } from "zod";
const app = express();
app.use(express.json());
const currentCustomerStream = new InMemoryStreamService();
// setInterval(() => {
//   currentCustomerStream.notify({
//     1: 1
//   })
// }, 5000)
const record = {
  c1: 0,
  c2: 0,
  c3: 0,
  c4: 0,
};
const notifyScheam = z.object({
  ticket: z.object({
    number: z.number(),
  }),
  counter: z.string(),
});
app.get("/stream", (req, res) => {
  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  // Send the initial state of `record` to the client
  res.write(`data: ${JSON.stringify(record)}\n\n`);
  const unsubscribe = currentCustomerStream.subscribe((e) => {
    res.write(`data: ${JSON.stringify(e)}\n\n`);
  });
  // Handle client disconnection
  req.on("close", () => {
    unsubscribe();
    console.log("Client disconnected");
  });
});
app.post("/notify", (req, res) => {
  const data = notifyScheam.parse(req.body);
  record[data.counter] = data.ticket.number;
  currentCustomerStream.notify(record);
  res.json("ok");
});
// Start the server
app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
