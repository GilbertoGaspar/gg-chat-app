import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { redisConnection } from "../config/redis.js";

// 100 requests per 15 minutes per IP
const defaultLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: [string, ...string[]]) =>
      redisConnection.call(...args) as Promise<any>,
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable deprecated headers
  message: {
    success: false,
    error: "Too many requests, please try again later.",
  },
});

export { defaultLimiter };
