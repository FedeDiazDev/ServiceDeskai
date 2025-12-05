import { Router } from "express"

import { createTicket, deleteTicket, getTicketById, getTickets, updateTicket, updateTicketStatus, assignTicket } from "../controllers/ticket.controller"
import { authenticateToken, requireStaff } from "../middlewares/auth.middleware"
import { validateBody, validateParams, validateQuery } from '../middlewares/validate';
import { createTicketSchema, updateTicketSchema, updateStatusSchema, listTicketsQuery, assignTicketSchema } from '../schemas/ticket.schema';
import { idParamSchema } from '../schemas/common.schema';

const router = Router();

router.use(authenticateToken);
router.post('/create', validateBody(createTicketSchema), createTicket);
router.get('/', validateQuery(listTicketsQuery), getTickets);
router.get('/:id', validateParams(idParamSchema), getTicketById);
router.put('/:id', validateParams(idParamSchema), requireStaff, validateBody(updateTicketSchema), updateTicket);
router.patch('/:id/assign', validateParams(idParamSchema), requireStaff, validateBody(assignTicketSchema), assignTicket);
router.patch('/:id/status', validateParams(idParamSchema), requireStaff, validateBody(updateStatusSchema), updateTicketStatus);
router.delete('/:id', validateParams(idParamSchema), requireStaff, deleteTicket);

export default router;