import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

import { index, about, home, contact, home1} from '../controllers/home_Controller.js';

router.get('', index);

router.get('/about', about);

router.get('/home', home);
router.get('/contact', contact);
router.get('/home1', home1);


export default router;
