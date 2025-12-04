import { Router } from "express";
import { getOverview, getTicketStats, getAgentWorkload, getOfficeStats, getTicketsReport } from "../controllers/admin.controller";
import { authenticateToken, requireRole } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);
router.use(requireRole(['admin']));

router.get('/stats/overview', getOverview);
router.get('/stats/tickets', getTicketStats);
router.get('/stats/agents', getAgentWorkload);
router.get('/stats/offices', getOfficeStats);
router.get('/reports/tickets', getTicketsReport);

export default router;