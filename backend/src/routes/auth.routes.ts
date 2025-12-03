import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.use(authenticateToken);
//Rutas portegidas
export default router;