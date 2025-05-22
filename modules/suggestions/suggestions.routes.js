import express from 'express';
import { postSuggestion } from './suggestions.controller.js';

const router = express.Router();
router.post('/create', postSuggestion)


export default router;


