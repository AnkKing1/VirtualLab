import express from 'express';
import { executeCode, getLatestCode } from '../controllers/codeExecutionController.js';

const router = express.Router();

router.post('/execute', executeCode);

router.get('/latest' , getLatestCode);

export default router;
