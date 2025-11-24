import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises } from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFilePath = path.join(__dirname, '..','logs', 'requests.log');

// Ensure the logs directory exists
const write_to_file = (message) => {
   const write_file = fs.writeFileSync(logFilePath, message + '\n', { flag: '' });
}

export { write_to_file };