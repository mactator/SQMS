import { createClient, RedisClientType } from "redis";

let redis: RedisClientType | null = null;

const getRedisClient = async (): Promise<RedisClientType> => {
  if (!redis) {
    // Specify your Redis server details here
    redis = createClient({
      url: "redis://localhost:6379", // Adjust the host and port if needed
    });

    try {
      await redis.connect();
      console.log("Connected to Redis server");
    } catch (error) {
      console.error("Failed to connect to Redis:", error);
      throw error;
    }
  }

  return redis;
};

export default getRedisClient;
