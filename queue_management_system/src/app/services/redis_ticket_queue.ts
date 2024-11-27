import { RedisClientType } from "redis";
import { ITicketQueue } from "../interfaces/ITicketQueue";
import { Ticket } from "../interfaces/Ticket";

export class RedisTicketQueue implements ITicketQueue {
  private readonly redisClient: RedisClientType;
  constructor(redisClient: RedisClientType) {
    this.redisClient = redisClient;
  }
  async enqueu(ticket: Ticket): Promise<boolean> {
    try {
      await this.redisClient.rPush("waiting_queue", JSON.stringify(ticket));
      return true;
    } catch (error) {
      return false;
    }
  }
  async dequeu(): Promise<Ticket | null> {
    const value = await this.redisClient.lPop("waiting_queue");
    return value ? (JSON.parse(value) as Ticket) : null;
  }
}
