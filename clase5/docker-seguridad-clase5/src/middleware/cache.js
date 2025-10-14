

const redisClient = require('./redisClient');

const cacheMiddleware = (keyPrefix) => {
    return async (req, res, next) => {
      const cacheKey = `${keyPrefix}:${req.params.id || 'all'}`;
      try {
          const cachedData = await redisClient.get(cacheKey);
          if (cachedData) {
              console.log(`Cache HIT: ${cacheKey}`);
              return res.send(JSON.parse(cachedData));
          } else {
              console.log(`Cache MISS: ${cacheKey}`);
              // Override res.send to cache the response before sending
              const originalSend = res.send;
              res.send = async (body) => {
                  await redisClient.setEx(cacheKey, 3600, JSON.stringify(body)); // Cache for 1 hour
                  originalSend.call(res, body);
              };
              next();
          }
      } catch (err) {
          console.error('Redis cache error:', err);
          next(); // Continue to the next middleware/route handler
      }
  };
};

module.exports = cacheMiddleware;