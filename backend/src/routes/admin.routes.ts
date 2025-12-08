import { Router } from "express";
import { authenticateToken, requireRole } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);
router.use(requireRole(['admin']));


export default router;