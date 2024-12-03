import { ITicketDispenser } from "./interfaces/ITicketDispenser";
import { ITicketQueue } from "./interfaces/ITicketQueue";
import { RedisTicketDispenser } from "./services/redis_ticket_dispenser";
import { RedisTicketQueue } from "./services/redis_ticket_queue";
import { redisClient } from "./redis_client";

export const ticketQueueService: ITicketQueue = new RedisTicketQueue(
  redisClient
);
export const ticketDispenserService: ITicketDispenser =
  new RedisTicketDispenser(redisClient);
