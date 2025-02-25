import express from 'express';
import {combineBook, createBook, deleteBook, updateBook} from '../controller/combineController.js';
const router= express.Router();

router.get('/combine-book',combineBook);
router.post('/create-book',createBook);
router.put('/update-book/:id',updateBook);
router.delete('/delete-book/:id',deleteBook);
export default router;