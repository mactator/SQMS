export class RedisTicketQueue {
  redisClient;
  constructor(redisClient) {
    this.redisClient = redisClient;
  }
  async enqueu(ticket) {
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
  async dequeu() {
    const value = await this.redisClient.lPop(
      `${process.env.BRANCH}:waiting_queue`
    );
    return value ? JSON.parse(value) : null;
  }
  async getQueue() {
    try {
      const values = await this.redisClient.lRange(
        `${process.env.BRANCH}:waiting_queue`,
        0,
        -1
      );
      return values.map((value) => JSON.parse(value));
    } catch (error) {
      console.error("Failed to retrieve queue:", error);
      return [];
    }
  }
}
