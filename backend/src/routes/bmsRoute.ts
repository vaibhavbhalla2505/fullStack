import express from 'express';
import {combineBook, createBook, updateBook} from '../controller/combineController.js';
const router= express.Router();

router.get('/combine-book',combineBook);
router.post('/create-book',createBook);
router.put('/update-book/:id',updateBook);
export default router;