import { TicketModel } from '../models/Ticket';
import { UserModel } from '../models/User';
import { OfficeModel } from '../models/Office';

export class AdminService {
  /**
   * Dashboard overview - resumen general del sistema
   * Return: totales de tickets (por estado), usuarios, agentes, oficinas
   */
  async getOverviewStats() {
  }

  /**
   * Estadísticas detalladas de tickets
   * @param startDate - Fecha inicio (opcional)
   * @param endDate - Fecha fin (opcional)
   * Return: tickets por estado, por prioridad, tendencia 30 días, tiempo promedio resolución
   */
  async getTicketStats(startDate?: Date, endDate?: Date) {
  }

  /**
   * Estadísticas de carga de trabajo por agente
   * Return: tickets asignados por agente (abiertos, en progreso, resueltos) + sin asignar
   */
  async getAgentWorkloadStats() {
  }

  /**
   * Estadísticas por oficina
   * Return: usuarios por oficina, tickets creados por oficina
   */
  async getOfficeStats() {
  }

  /**
   * Reporte de tickets para exportar
   * @param filters - { startDate?, endDate?, status?, priority? }
   * Return: lista de tickets con filtros aplicados
   */
  async getTicketsReport(filters: {
    startDate?: Date;
    endDate?: Date;
    status?: string;
    priority?: string;
  }) {
  }
}

export const adminService = new AdminService();
