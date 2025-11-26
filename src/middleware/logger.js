import { logInfo, logError } from '../utility/file_logger.js';

const logger = (req, res, next) => {
  // Capture the start time
  const start = Date.now();

  // Hook into the response 'finish' event to log details after the response is sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl, ip, body } = req;
    const { statusCode } = res;
    const contentLength = res.get('content-length');

    const logEntry = JSON.stringify({
      timestamp: new Date().toISOString(),
      ip,
      method,
      url: originalUrl,
      status: statusCode,
      size: contentLength || 0,
      duration: `${duration}ms`,
      body: body || {}, 
    });

    if (statusCode >= 400) {
      logError(logEntry);
    } else {
      logInfo(logEntry);
    }
  });

  next();
}

export default logger;