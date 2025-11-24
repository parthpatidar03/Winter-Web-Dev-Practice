import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {write_to_file} from '../utility/file_logger.js';
// Middleware function to log requests
const logger = (req, res, next) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);   
  
  //console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} - ${new Date().toISOString()}`);
  write_to_file(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} - ${new Date().toISOString()}`);
  // console.log('👍✅ Logger middleware executed from:', __dirname);
  next();
  // console.log('Response has been sent.');
}

export default logger;