import { Hono } from "hono";
import {
  ticketDispenserService,
  ticketQueueService,
} from "./ticketQueueService";

const queueRouter = new Hono();

queueRouter.post("/", async (c) => {
  console.log("HI Abo Sani");

  const ticket = await ticketDispenserService.getNextTicket();

  const success = await ticketQueueService.enqueu(ticket);
  console.log({
    ticket,
    success,
  });
  if (success) {
    return c.json({ success: true, ticket });
  } else {
    console.error("Error adding ticket");
    return c.json(
      { success: false, error: "Failed to add ticket to the queue" },
      500
    );
  }
});

queueRouter.get("/next", async (c) => {
  try {
    const nextCustomer = await ticketQueueService.dequeu();
    return c.json({ ticket: nextCustomer || null });
  } catch (error) {
    console.error("Error fetching the next customer:", error);
    return c.json(
      { success: false, error: "Failed to fetch the next ticket" },
      500
    );
  }
});

queueRouter.get("/fullQueue", async (c) => {
  try {
    const queue = await ticketQueueService.getQueue();
    return c.json({ queue: queue });
  } catch (error) {}
});

export default queueRouter;
