const redisClient = require('../middleware/redisClient');

async function stats (req, res) {
  try {
    const keys = await redisClient.keys('*');
    const stats = {
      totalKeys: keys.length,
      keys: keys
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE /cache/clear - Limpiar todo el cache
 async function clear (req, res){
  try {
    await redisClient.flushAll();
    res.json({ message: 'Cache limpiado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    stats,
    clear
}