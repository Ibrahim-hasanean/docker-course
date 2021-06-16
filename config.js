module.exports = {
  MONGO_IP_Address: process.env.MONGO_IP_Address || "mongo",
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET,
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_URL: process.env.REDIS_URL || "redis",
};
