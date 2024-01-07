module.exports = (options) => {
  const { limit, windowMs, message } = options;
  const requestTimestamps = new Map();

  return function (req, res, next) {
    const ip = req.ip;
    if (!requestTimestamps.has(ip)) {
      requestTimestamps.set(ip, [Date.now()]);
    } else {
      const timestamps = requestTimestamps.get(ip);
      const currentTime = Date.now();

      while (timestamps.length && currentTime - timestamps[0] > windowMs) {
        timestamps.shift();
      }
      timestamps.push(currentTime);

      try {
        if (timestamps.length > limit) {
          return next({
            status: 429,
            message: `Too many attempts try after ${
              windowMs / (60 * 1000)
            } mintues`,
          });
        }
      } catch (err) {
        next(err);
      }
    }
    next();
  };
};
