import { Request, Response } from 'express';

// GET /admin/stats/overview
// TODO: Dashboard general del sistema
export const getOverview = async (req: Request, res: Response) => {
};

// GET /admin/stats/tickets
// TODO: Estadísticas detalladas de tickets
export const getTicketStats = async (req: Request, res: Response) => {
};

// GET /admin/stats/agents
// TODO: Carga de trabajo por service_desk
export const getAgentWorkload = async (req: Request, res: Response) => {
};

// GET /admin/stats/offices
// TODO: Estadísticas por oficina
export const getOfficeStats = async (req: Request, res: Response) => {
};

// GET /admin/reports/tickets
// TODO: Exportar reporte de tickets
export const getTicketsReport = async (req: Request, res: Response) => {
};
