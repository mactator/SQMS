import { ITicketQueue } from "interface/ITicketQueue";
import { Ticket } from "interface/Ticket";
import { RedisClientType } from "redis";

export class RedisTicketQueue implements ITicketQueue {
  private readonly redisClient: RedisClientType;
  constructor(redisClient: RedisClientType) {
    this.redisClient = redisClient;
  }

  async enqueu(ticket: Ticket): Promise<boolean> {
    try {
      await this.redisClient.rPush(
        `${process.env.BRANCH}:waiting_queue`,
        JSON.stringify(ticket)
      );
      return true;
    } catch (error) {
      return false;
    }
  }
  async dequeu(): Promise<Ticket | null> {
    const value = await this.redisClient.lPop(
      `${process.env.BRANCH}:waiting_queue`
    );
    return value ? (JSON.parse(value) as Ticket) : null;
  }

  async getQueue(): Promise<Ticket[]> {
    try {
      const values = await this.redisClient.lRange(
        `${process.env.BRANCH}:waiting_queue`,
        0,
        -1
      );
      return values.map((value: string) => JSON.parse(value) as Ticket);
    } catch (error) {
      console.error("Failed to retrieve queue:", error);
      return [];
    }
  }
}
