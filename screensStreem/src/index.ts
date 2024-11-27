import express from 'express';
import type { StreamService } from './interface/stream_service';
import  { InMemoryStreamService } from './services/In_memory_stream_service';
import type { ScreenNumbers } from './interface/ScreenNumbers';
import { z } from 'zod';

const app = express();

app.use(
  express.json()
);

const currentCustomerStream: StreamService<ScreenNumbers> = new InMemoryStreamService();

// setInterval(() => {
//   currentCustomerStream.notify({
//     1: 1
//   })
// }, 5000)

const record: ScreenNumbers = {
  "0": 67,
  "1": 20,
  "2": 3,
  "4": 4,
  "10": 67,
  "11": 20,
  "12": 3,
  "14": 4,
  "20": 67,
  "21": 20,
  "22": 3,
  "24": 4,

}
const notifyScheam = z.object({
  ticket: z.object({
    number: z.number()
  }),
  counter: z.string(),
})

app.get('/stream', (req, res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send the initial state of `record` to the client
  res.write(`data: ${JSON.stringify(record)}\n\n`);

  const unsubscribe = currentCustomerStream.subscribe((e) => {
    res.write(`data: ${JSON.stringify(e)}\n\n`);
  });

  // Handle client disconnection
  req.on('close', () => {
    unsubscribe();
    console.log('Client disconnected');
  });
});


app.post('/notify',
  (req, res) => {
    const data = notifyScheam.parse(req.body)

    record[data.counter] = data.ticket.number;
    currentCustomerStream.notify(record);

    res.json("ok")
  }
);

// Start the server
app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
