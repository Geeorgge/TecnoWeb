import { Injectable, Logger } from '@nestjs/common';

interface CostStats {
  date: string;
  messagesSent: number;
  estimatedCostUSD: number;
  dailyLimit: number;
  monthlyTotal: number;
}

@Injectable()
export class CostMonitorService {
  private readonly logger = new Logger(CostMonitorService.name);

  // Costo por mensaje de WhatsApp en Twilio
  private readonly COST_PER_MESSAGE = 0.005; // $0.005 USD

  // Límites de costo (puedes configurar en .env)
  private readonly DAILY_LIMIT_USD = parseFloat(
    process.env.DAILY_COST_LIMIT_USD || '2.00',
  );
  private readonly MONTHLY_LIMIT_USD = parseFloat(
    process.env.MONTHLY_COST_LIMIT_USD || '20.00',
  );

  // Almacenamiento en memoria (en producción usar Redis o DB)
  private dailyCount: Map<string, number> = new Map();
  private monthlyCount: Map<string, number> = new Map();

  constructor() {
    // Limpieza diaria a medianoche
    this.scheduleDailyReset();
  }

  /**
   * Verifica si se puede enviar un mensaje sin exceder límites
   */
  async canSendMessage(): Promise<{
    allowed: boolean;
    reason?: string;
    stats: CostStats;
  }> {
    const today = this.getDateKey();
    const currentMonth = this.getMonthKey();

    const dailyMessages = this.dailyCount.get(today) || 0;
    const monthlyMessages = this.monthlyCount.get(currentMonth) || 0;

    const dailyCost = dailyMessages * this.COST_PER_MESSAGE;
    const monthlyCost = monthlyMessages * this.COST_PER_MESSAGE;

    const stats: CostStats = {
      date: today,
      messagesSent: dailyMessages,
      estimatedCostUSD: dailyCost,
      dailyLimit: this.DAILY_LIMIT_USD,
      monthlyTotal: monthlyCost,
    };

    // Verificar límite diario
    if (dailyCost >= this.DAILY_LIMIT_USD) {
      this.logger.error(
        `❌ DAILY COST LIMIT EXCEEDED | ` +
          `Current: $${dailyCost.toFixed(3)} | ` +
          `Limit: $${this.DAILY_LIMIT_USD} | ` +
          `Messages: ${dailyMessages}`,
      );

      return {
        allowed: false,
        reason: `Límite de costo diario alcanzado ($${this.DAILY_LIMIT_USD} USD). ` +
          `Mensajes enviados hoy: ${dailyMessages}. ` +
          `Las notificaciones se reanudarán mañana.`,
        stats,
      };
    }

    // Verificar límite mensual
    if (monthlyCost >= this.MONTHLY_LIMIT_USD) {
      this.logger.error(
        `❌ MONTHLY COST LIMIT EXCEEDED | ` +
          `Current: $${monthlyCost.toFixed(3)} | ` +
          `Limit: $${this.MONTHLY_LIMIT_USD} | ` +
          `Messages: ${monthlyMessages}`,
      );

      return {
        allowed: false,
        reason: `Límite de costo mensual alcanzado ($${this.MONTHLY_LIMIT_USD} USD). ` +
          `Mensajes enviados este mes: ${monthlyMessages}. ` +
          `Las notificaciones se reanudarán el próximo mes.`,
        stats,
      };
    }

    // Advertencia si está cerca del límite (80%)
    const dailyWarningThreshold = this.DAILY_LIMIT_USD * 0.8;
    if (dailyCost >= dailyWarningThreshold && dailyCost < this.DAILY_LIMIT_USD) {
      this.logger.warn(
        `⚠️ APPROACHING DAILY LIMIT | ` +
          `Current: $${dailyCost.toFixed(3)} | ` +
          `Limit: $${this.DAILY_LIMIT_USD} | ` +
          `Remaining: $${(this.DAILY_LIMIT_USD - dailyCost).toFixed(3)}`,
      );
    }

    return {
      allowed: true,
      stats,
    };
  }

  /**
   * Registra un mensaje enviado
   */
  async recordMessageSent(): Promise<void> {
    const today = this.getDateKey();
    const currentMonth = this.getMonthKey();

    // Incrementar contadores
    const dailyMessages = (this.dailyCount.get(today) || 0) + 1;
    const monthlyMessages = (this.monthlyCount.get(currentMonth) || 0) + 1;

    this.dailyCount.set(today, dailyMessages);
    this.monthlyCount.set(currentMonth, monthlyMessages);

    const dailyCost = dailyMessages * this.COST_PER_MESSAGE;
    const monthlyCost = monthlyMessages * this.COST_PER_MESSAGE;

    this.logger.log(
      `📊 Message recorded | ` +
        `Today: ${dailyMessages} msgs ($${dailyCost.toFixed(3)}) | ` +
        `Month: ${monthlyMessages} msgs ($${monthlyCost.toFixed(3)})`,
    );
  }

  /**
   * Obtiene estadísticas actuales
   */
  getStats(): {
    daily: CostStats;
    monthly: {
      messagesSent: number;
      estimatedCostUSD: number;
      limit: number;
    };
  } {
    const today = this.getDateKey();
    const currentMonth = this.getMonthKey();

    const dailyMessages = this.dailyCount.get(today) || 0;
    const monthlyMessages = this.monthlyCount.get(currentMonth) || 0;

    return {
      daily: {
        date: today,
        messagesSent: dailyMessages,
        estimatedCostUSD: dailyMessages * this.COST_PER_MESSAGE,
        dailyLimit: this.DAILY_LIMIT_USD,
        monthlyTotal: monthlyMessages * this.COST_PER_MESSAGE,
      },
      monthly: {
        messagesSent: monthlyMessages,
        estimatedCostUSD: monthlyMessages * this.COST_PER_MESSAGE,
        limit: this.MONTHLY_LIMIT_USD,
      },
    };
  }

  /**
   * Genera reporte detallado
   */
  getDetailedReport(): string {
    const stats = this.getStats();

    const dailyPercentage = (
      (stats.daily.estimatedCostUSD / stats.daily.dailyLimit) *
      100
    ).toFixed(1);

    const monthlyPercentage = (
      (stats.monthly.estimatedCostUSD / stats.monthly.limit) *
      100
    ).toFixed(1);

    return `
╔════════════════════════════════════════════╗
║     COST MONITORING REPORT - TWILIO        ║
╠════════════════════════════════════════════╣
║ DAILY USAGE                                ║
║  Date: ${stats.daily.date.padEnd(32)}  ║
║  Messages: ${stats.daily.messagesSent.toString().padEnd(27)} ║
║  Cost: $${stats.daily.estimatedCostUSD.toFixed(3).padEnd(31)} ║
║  Limit: $${stats.daily.dailyLimit.toFixed(2).padEnd(30)} ║
║  Usage: ${dailyPercentage}%${' '.repeat(30 - dailyPercentage.length)} ║
╠════════════════════════════════════════════╣
║ MONTHLY USAGE                              ║
║  Messages: ${stats.monthly.messagesSent.toString().padEnd(27)} ║
║  Cost: $${stats.monthly.estimatedCostUSD.toFixed(3).padEnd(31)} ║
║  Limit: $${stats.monthly.limit.toFixed(2).padEnd(30)} ║
║  Usage: ${monthlyPercentage}%${' '.repeat(30 - monthlyPercentage.length)} ║
╚════════════════════════════════════════════╝
    `.trim();
  }

  private getDateKey(): string {
    const now = new Date();
    return now.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  private getMonthKey(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
  }

  private scheduleDailyReset(): void {
    // Calcular tiempo hasta medianoche
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    // Resetear a medianoche
    setTimeout(() => {
      this.resetDailyCounts();
      // Programar siguiente reset
      setInterval(() => this.resetDailyCounts(), 24 * 60 * 60 * 1000);
    }, msUntilMidnight);

    this.logger.log(
      `Daily reset scheduled for: ${tomorrow.toLocaleString('es-MX')}`,
    );
  }

  private resetDailyCounts(): void {
    const yesterday = this.getYesterdayKey();
    const yesterdayMessages = this.dailyCount.get(yesterday) || 0;
    const yesterdayCost = yesterdayMessages * this.COST_PER_MESSAGE;

    if (yesterdayMessages > 0) {
      this.logger.log(
        `📊 Daily reset | Yesterday: ${yesterdayMessages} msgs ($${yesterdayCost.toFixed(3)})`,
      );
    }

    // Mantener solo últimos 7 días
    const keysToDelete: string[] = [];
    for (const key of this.dailyCount.keys()) {
      const daysDiff = this.getDaysDifference(key);
      if (daysDiff > 7) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => this.dailyCount.delete(key));

    if (keysToDelete.length > 0) {
      this.logger.log(`Cleaned up ${keysToDelete.length} old daily records`);
    }
  }

  private getYesterdayKey(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  }

  private getDaysDifference(dateKey: string): number {
    const date = new Date(dateKey);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }
}
