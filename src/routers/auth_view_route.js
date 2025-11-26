import express from 'express';
import {renderLogin , loginSSR } from '../controllers/authSessionController.js';

const router = express.Router();

router.get('/login', renderLogin);
router.post('/login', loginSSR);

export default router;
