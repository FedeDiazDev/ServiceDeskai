import { Router } from "express"
import { createTicket, deleteTicket, getTicketById, getTickets, updateTicket } from "../controllers/ticket.controller"
import { authenticateToken } from "../middlewares/auth.middleware"

const router = Router();

//TODO: crear funcion de actualizar solo esado del ticket
router.use(authenticateToken);
router.post('/create', createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

export default router;