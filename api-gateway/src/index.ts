import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

// import ticketRouter from "./ticket";
import queueRouter from "./queue";
const PORT = Bun.env.PORT;

const app = new Hono({
  strict: false,
}).basePath("/api");

app.use(logger());

app.use(async (c, next) => {
  c.header("MAIN-SERVER", PORT);

  await next();
});

app.use(
  "*",
  cors({
    origin: "*", // Allow all origins
    allowHeaders: ["Content-Type", "Authorization"], // Allow these headers
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    credentials: false, // Do not allow cookies or authorization headers by default
  })
);

app.get("/", (c) => {
  return c.json({
    message: `Hello from Hono! ${PORT}`,
  });
});

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

export default {
  port: PORT,
  fetch: app.fetch,
};
