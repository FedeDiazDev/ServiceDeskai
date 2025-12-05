import { Router } from "express";
import { getUserById, getAllUsers, updateUser, changeUserRole, resetUserPassword, deleteUser } from "../controllers/user.controller";
import { authenticateToken, requireRole, requireOwnershipOrAdmin } from "../middlewares/auth.middleware";
import { validateParams } from "../middlewares/validate";
import { idParamSchema } from "../schemas/common.schema";

const router = Router();

router.use(authenticateToken);
router.get('/', requireRole(['admin']), getAllUsers);

router.get('/:id', validateParams(idParamSchema), requireOwnershipOrAdmin('id'), getUserById);
router.put('/:id', validateParams(idParamSchema), requireOwnershipOrAdmin('admin'), updateUser);
router.patch('/:id/role', validateParams(idParamSchema), requireRole(['admin']), changeUserRole);
router.patch('/:id/password', validateParams(idParamSchema), requireOwnershipOrAdmin('id'), resetUserPassword);
router.delete('/:id', validateParams(idParamSchema), requireRole(['admin']), deleteUser);

export default router;