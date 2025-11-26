import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
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
import authViewRouter from './src/routers/auth_view_route.js';
import cors from 'cors';
import  authenticateToken  from './src/middleware/auth_middleware.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import  authenticateSession  from './src/middleware/sessionMiddleware.js';

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'SESSION_SECRET', // Use the same secret or a new one
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Set to true in production (HTTPS)
    httpOnly: true,
    maxAge: 180000
  }
}));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger); // Logger moved after body parsers
app.use(methodOverride('_method'));
app.use('/users', authenticateSession, userRoute);
app.use('/', router);

app.use('/api/users', authenticateToken, userapi);
app.use('/api/auth', authRouter);
app.use('/', authViewRouter); // Mount SSR auth routes at root
app.set('view engine', 'ejs');

// 404 Handler
app.use((req, res, next) => {
  res.status(404).render('not_found', { title: 'Page Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.render('error', { 
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});