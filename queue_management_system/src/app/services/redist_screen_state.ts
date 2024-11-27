// import { RedisClientType } from "redis";
// import { IScreenState, ScreenArray } from "../interfaces/IScreenState";

// export class RedisScreenState implements IScreenState {
//   private readonly redisClient: RedisClientType;
//   private readonly dataKey: string = "screenArray:data"; // Key to store the array

//   constructor(redisClient: RedisClientType) {
//     this.redisClient = redisClient;
//   }

//   async set(array: ScreenArray): Promise<void> {

   
//       await this.redisClient.set(this.dataKey, JSON.stringify(array));

//   }

  
// }
