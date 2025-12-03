import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tickets', /* ticketRoutes */);
router.use('/admin', /* adminRoutes */);

export default router;

