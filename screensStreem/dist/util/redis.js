import { createClient } from "redis";
let redis = null;
const getRedisClient = async () => {
  if (!redis) {
    // Specify your Redis server details here
    redis = createClient({
      url: process.env.REDIS, // Adjust the host and port if needed
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
