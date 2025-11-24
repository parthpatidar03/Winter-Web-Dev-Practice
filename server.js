import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
import ejs from 'ejs';
import router from './src/routers/home_route.js';
import logger from './src/middleware/logger.js';

app.use(logger);
app.use('/', router);
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 