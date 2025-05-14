import express from 'express';
import { getCategories } from './checklist.controller.js';

const router = express.Router();

router.get('/event',getCategories)

export default router;