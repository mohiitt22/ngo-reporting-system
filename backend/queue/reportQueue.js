const { Queue } = require("bullmq");
const IORedis = require("ioredis");

// Redis connection (works locally + in production)
const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

// Create queue
const reportQueue = new Queue("reportQueue", {
  connection,
});

module.exports = reportQueue;
