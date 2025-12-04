import { Router } from "express"

import { createTicket, deleteTicket, getTicketById, getTickets, updateTicket, updateTicketStatus } from "../controllers/ticket.controller"
import { authenticateToken } from "../middlewares/auth.middleware"
import { validateBody, validateParams, validateQuery } from '../middlewares/validate';
import { createTicketSchema, updateTicketSchema, updateStatusSchema, listTicketsQuery } from '../schemas/ticket.schema';
import { idParamSchema } from '../schemas/common.schema';

const router = Router();

router.use(authenticateToken);
router.post('/create', validateBody(createTicketSchema), createTicket);
router.get('/', validateQuery(listTicketsQuery), getTickets);
router.get('/:id', validateParams(idParamSchema), getTicketById);
router.put('/:id', validateParams(idParamSchema), validateBody(updateTicketSchema), updateTicket);
router.put('/status/:id', validateParams(idParamSchema), validateBody(updateStatusSchema), updateTicketStatus);
router.delete('/:id', validateParams(idParamSchema), deleteTicket);

export default router;