import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { generateTicket } from '../controllers/ai.controller';

const router = Router();

router.use(authenticateToken);
router.post('/analyze', generateTicket);

export default router;