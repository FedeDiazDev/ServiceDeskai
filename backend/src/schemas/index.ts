export {
  objectIdSchema,
  paginationSchema,
  idParamSchema,
  type ObjectId,
  type PaginationQuery,
  type IdParam,
} from './common.schema';

export {
  registerSchema,
  loginSchema,
  type RegisterInput,
  type LoginInput,
} from './auth.schema';

export {
  createTicketSchema,
  updateTicketSchema,
  updateStatusSchema,
  listTicketsQuery,
  type CreateTicketInput,
  type UpdateTicketInput,
  type UpdateStatusInput,
  type ListTicketsQuery,
} from './ticket.schema';
