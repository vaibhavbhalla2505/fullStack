import express from 'express';
import { checkData, createUser } from '../controller/userController.js';
const router=express.Router();

router.post('/create-user',createUser)
router.post('/check-user',checkData)
export default router;