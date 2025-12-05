import { Router } from "express";
import { createOffice, getAllOffices, getOfficeById, updateOffice, deleteOffice } from "../controllers/office.controller";
import { authenticateToken, requireRole } from "../middlewares/auth.middleware";
import { validateBody, validateParams } from "../middlewares/validate";
import { createOfficeSchema, updateOfficeSchema } from "../schemas/office.schema";
import { idParamSchema } from "../schemas/common.schema";

const router = Router();

router.use(authenticateToken);
router.use(requireRole(['admin']));

router.get('/', getAllOffices);
router.get('/:id', validateParams(idParamSchema), getOfficeById);
router.post('/', validateBody(createOfficeSchema), createOffice);
router.put('/:id', validateParams(idParamSchema), validateBody(updateOfficeSchema), updateOffice);
router.delete('/:id', validateParams(idParamSchema), deleteOffice);

export default router;
