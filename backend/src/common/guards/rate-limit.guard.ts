import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';

interface RateLimitEntry {
  count: number;
  firstRequest: Date;
  blockedUntil?: Date;
}

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly logger = new Logger(RateLimitGuard.name);
  private requests: Map<string, RateLimitEntry> = new Map();

  // Configuración (puedes mover a .env)
  private readonly MAX_REQUESTS =
    parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5', 10);
  private readonly WINDOW_MINUTES =
    parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES || '60', 10);
  private readonly BLOCK_DURATION_MS = this.WINDOW_MINUTES * 60 * 1000; // Mismo tiempo que la ventana
  private readonly CLEANUP_INTERVAL_MS = 60 * 60 * 1000; // 1 hora

  constructor() {
    // Auto-limpieza periódica
    setInterval(() => this.cleanup(), this.CLEANUP_INTERVAL_MS);
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const clientIp = this.getClientIp(request);

    const entry = this.requests.get(clientIp);
    const now = new Date();

    // Verificar si está bloqueado
    if (entry?.blockedUntil && now < entry.blockedUntil) {
      const remainingMinutes = Math.ceil(
        (entry.blockedUntil.getTime() - now.getTime()) / (60 * 1000),
      );

      this.logger.warn(
        `IP blocked: ${clientIp} | Remaining: ${remainingMinutes} min | ` +
          `Path: ${request.url}`,
      );

      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: `Has excedido el límite de solicitudes. Intenta nuevamente en ${remainingMinutes} minuto(s).`,
          error: 'Too Many Requests',
          blockedUntil: entry.blockedUntil,
          limit: this.MAX_REQUESTS,
          window: `${this.WINDOW_MINUTES} minutos`,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Verificar ventana de tiempo
    if (entry) {
      const windowElapsed =
        now.getTime() - entry.firstRequest.getTime() >
        this.WINDOW_MINUTES * 60 * 1000;

      if (windowElapsed) {
        // Ventana expiró, resetear contador
        this.requests.set(clientIp, {
          count: 1,
          firstRequest: now,
        });
        this.logger.log(`Rate limit reset for IP: ${clientIp}`);
        return true;
      }

      // Incrementar contador
      entry.count++;

      if (entry.count > this.MAX_REQUESTS) {
        // Bloquear IP
        entry.blockedUntil = new Date(now.getTime() + this.BLOCK_DURATION_MS);

        this.logger.warn(
          `IP BLOCKED: ${clientIp} | ` +
            `Requests: ${entry.count}/${this.MAX_REQUESTS} | ` +
            `Blocked until: ${entry.blockedUntil.toLocaleString('es-MX')}`,
        );

        throw new HttpException(
          {
            statusCode: HttpStatus.TOO_MANY_REQUESTS,
            message: `Has excedido el límite de ${this.MAX_REQUESTS} solicitudes en ${this.WINDOW_MINUTES} minutos. ` +
              `Tu IP ha sido bloqueada temporalmente por ${this.WINDOW_MINUTES} minutos.`,
            error: 'Too Many Requests',
            blockedUntil: entry.blockedUntil,
            limit: this.MAX_REQUESTS,
            window: `${this.WINDOW_MINUTES} minutos`,
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      // Advertencia progresiva
      const remaining = this.MAX_REQUESTS - entry.count;
      if (remaining <= 2) {
        this.logger.warn(
          `IP approaching limit: ${clientIp} | ` +
            `Requests: ${entry.count}/${this.MAX_REQUESTS} | ` +
            `Remaining: ${remaining}`,
        );
      }

      return true;
    }

    // Primera solicitud de esta IP
    this.requests.set(clientIp, {
      count: 1,
      firstRequest: now,
    });

    this.logger.log(
      `New IP tracked: ${clientIp} | Path: ${request.url}`,
    );

    return true;
  }

  private getClientIp(request: Request): string {
    // Soporta proxies y load balancers
    const forwarded = request.headers['x-forwarded-for'];
    if (forwarded) {
      const ips = (forwarded as string).split(',');
      return ips[0].trim();
    }

    const realIp = request.headers['x-real-ip'];
    if (realIp) {
      return realIp as string;
    }

    return request.ip || request.socket.remoteAddress || 'unknown';
  }

  private cleanup(): void {
    const now = new Date();
    let cleaned = 0;

    for (const [ip, entry] of this.requests.entries()) {
      const age = now.getTime() - entry.firstRequest.getTime();
      const isExpired = age > this.CLEANUP_INTERVAL_MS;

      if (isExpired && (!entry.blockedUntil || now > entry.blockedUntil)) {
        this.requests.delete(ip);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      this.logger.log(
        `Cleanup: Removed ${cleaned} expired entries | ` +
          `Active IPs: ${this.requests.size}`,
      );
    }
  }

  // Método público para obtener estadísticas (útil para monitoring)
  getStats(): {
    totalIPs: number;
    blockedIPs: number;
    maxRequests: number;
    windowMinutes: number;
  } {
    const now = new Date();
    const blockedIPs = Array.from(this.requests.values()).filter(
      (entry) => entry.blockedUntil && now < entry.blockedUntil,
    ).length;

    return {
      totalIPs: this.requests.size,
      blockedIPs,
      maxRequests: this.MAX_REQUESTS,
      windowMinutes: this.WINDOW_MINUTES,
    };
  }
}
