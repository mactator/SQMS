import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from 'hono/cors'


// import ticketRouter from "./ticket";
import queueRouter from "./queue";
import { ITicketQueue } from "@/app/interfaces/ITicketQueue";
import { RedisTicketQueue } from "@/app/services/redis_ticket_queue";
import { ITicketDispenser } from "@/app/interfaces/ITicketDispenser";
import { RedisTicketDispenser } from "@/app/services/redis_ticket_dispenser";
import getRedisClient from "@/app/utils/redis";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.use(
  "/api/*",
  cors({
    origin: "*", // Allow all origins
    allowHeaders: ["Content-Type", "Authorization"], // Allow these headers
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    credentials: false, // Do not allow cookies or authorization headers by default
  })
);



const redisClient = await getRedisClient();

export const ticketQueueService: ITicketQueue = new RedisTicketQueue(
  redisClient
);
export const ticketDispenserService: ITicketDispenser =
  new RedisTicketDispenser(redisClient);

// Root endpoint
app.get("/hello", (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({
    code: 500,
    message: err.message,
  });
});


app.route("/queue", queueRouter);



export const GET = handle(app);
export const POST = handle(app);
