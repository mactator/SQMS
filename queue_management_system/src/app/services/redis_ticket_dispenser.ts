import { RedisClientType } from "redis";
import { ITicketDispenser } from "../interfaces/ITicketDispenser";
import { Ticket } from "../interfaces/Ticket";

export class RedisTicketDispenser implements ITicketDispenser {
  private readonly redisClient: RedisClientType;

  constructor(redisClient: RedisClientType) {
    this.redisClient = redisClient;
  }

  async getNextTicket(): Promise<Ticket> {
    const ticketNumber = await this.redisClient.incr("ticket_number");

    return {
      number: ticketNumber,
    };
  }
}
