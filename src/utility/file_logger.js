import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log file paths
const logsDir = path.join(__dirname, '../../logs');
const appLogPath = path.join(logsDir, 'app.log');
const errorLogPath = path.join(logsDir, 'error.log');

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const appendLog = (filePath, message) => {
   try {
      fs.appendFileSync(filePath, message + '\n');
   } catch (err) {
      console.error('Failed to write to log file:', err);
   }
};

const logInfo = (message) => {
    appendLog(appLogPath, `[INFO] ${message}`);
};

const logError = (message) => {
    // Write to both error log and app log for completeness
    appendLog(errorLogPath, `[ERROR] ${message}`);
   //  appendLog(appLogPath, `[ERROR] ${message}`);
};

export { logInfo, logError };