import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
import ejs from 'ejs';
import router from './src/routers/home_route.js';
import userRoute from './src/routers/user_route.js';
import logger from './src/middleware/logger.js';
import methodOverride from 'method-override';
import userapi from './src/routers/userapi_route.js';
import authRouter from './src/routers/auth_route.js';
import cors from 'cors';
import  authenticateToken  from './src/middleware/auth_middleware.js';

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger); // Logger moved after body parsers
app.use(methodOverride('_method'));
app.use('/', router);
app.use('/users', userRoute);

app.use('/api/users', authenticateToken, userapi);
app.use('/api/auth', authRouter);
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 