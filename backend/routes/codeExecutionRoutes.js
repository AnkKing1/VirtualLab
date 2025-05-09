import express from 'express';
import { executeCode } from '../controllers/codeExecutionController.js';

const router = express.Router();

router.post('/execute', executeCode);

export default router;
