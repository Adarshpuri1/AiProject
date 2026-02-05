import express from 'express'
import { AiController } from '../controller/ai.controller.js';
const router = express.Router();

router.get('/get-response',AiController)


export default router;