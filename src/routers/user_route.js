import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { showAllUsers , showEachUser , editUser , updateUser , addNewUser, showAddUserForm, deleteUserById} from '../controllers/user_Controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();


router.get('/', showAllUsers); // Route to show list of users
router.get('/new', showAddUserForm);

router.post('/', addNewUser);
router.get('/:id', showEachUser);
router.get('/:id/edit', editUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUserById);
          
export default router;