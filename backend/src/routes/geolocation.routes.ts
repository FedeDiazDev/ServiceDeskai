import { Router } from "express";
import { getOfficesForLocation } from "../controllers/geolocation.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

// Protected route - user must be authenticated
router.use(authenticateToken);

// GET /geolocation/offices - Get offices based on user's IP location
router.get('/offices', getOfficesForLocation);

export default router;
