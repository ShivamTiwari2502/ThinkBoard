// const rateLimit = require("express-rate-limit");
import rateLimit from "express-rate-limit";

// Create a rate limiter
const rateLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 5, // limit each IP to 5 requests per windowMs
  message: "please wait so many request received",
  headers: true, // send X-RateLimit-* headers
});

export default rateLimiter;
