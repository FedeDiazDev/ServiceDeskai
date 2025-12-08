import { Router } from 'express';
import { sendReportEmail } from '../controllers/report.controller';
import { authenticateToken, requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.post('/email', authenticateToken, requireRole(['admin', 'service']), sendReportEmail);

export default router;
