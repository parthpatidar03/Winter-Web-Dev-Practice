import express from "express";
const router = express.Router();
import { getUsers , getUserbyapiId, addNewUser, updateUserApi, deleteUserApi } from '../controllers/useApi_Controller.js';
import authenticateToken from '../middleware/auth_middleware.js';

router.get('/', getUsers);
router.get('/:id', getUserbyapiId);
router.post('/', authenticateToken, addNewUser);
router.patch('/:id', authenticateToken, updateUserApi);
router.delete('/:id', authenticateToken, deleteUserApi);
export default router;