import { Router } from 'express';
import { loginUser, registerUser, me, logout, refresh } from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validate';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', validateBody(registerSchema), registerUser);
router.post('/login', validateBody(loginSchema), loginUser);
router.get('/me', me);
router.post('/logout', logout);
router.post('/refresh', refresh);

export default router;