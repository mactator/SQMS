import { createClient, RedisClientType } from "redis";

export type QueueMetrics = {
  queueLength: number;
  averageWaitTime: number;
  averageServiceTime: number;
};

class QueueMetricsService {
  private redisClient: RedisClientType;

  constructor(redisUrl: string) {
    // Create the Redis client
    this.redisClient = createClient({ url: redisUrl });

    // Log Redis errors (optional in production)
    this.redisClient.on("error", (err: Error) => {
      console.error("Redis Client Error", err);
    });
  }

  // Connect to Redis (only if not already open)
  async connect(): Promise<void> {
    if (!this.redisClient.isOpen) {
      await this.redisClient.connect();
    }
  }

  // Disconnect from Redis (only if it's open)
  async disconnect(): Promise<void> {
    if (this.redisClient.isOpen) {
      await this.redisClient.disconnect();
    }
  }

  // Retrieve queue length from the single waiting queue list
  async getQueueLength(queueKey: string): Promise<number> {
    const length = await this.redisClient.lLen(queueKey);
    return length;
  }

  // Fake "average service time" derived from the queue length
  async getAverageServiceTime(queueKey: string): Promise<number> {
    const length = await this.redisClient.lLen(queueKey);
    // Example formula: base = 2 min, plus 0.5 min for each person in queue
    return 2 + length * 0.5;
  }

  // Fake "average wait time" also derived from the queue length
  async getAverageWaitTime(queueKey: string): Promise<number> {
    const length = await this.redisClient.lLen(queueKey);
    // Example formula: base = 1 min, plus 0.3 min for each person in queue
    return 1 + length * 0.3;
  }

  // Retrieve all metrics by using the same queue key
  async getQueueMetrics(queueKey: string): Promise<QueueMetrics> {
    const [queueLength, averageServiceTime, averageWaitTime] = await Promise.all([
      this.getQueueLength(queueKey),
      this.getAverageServiceTime(queueKey),
      this.getAverageWaitTime(queueKey),
    ]);

    return {
      queueLength,
      averageWaitTime,
      averageServiceTime,
    };
  }
}

export default QueueMetricsService;
