import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

interface ProfanityAttempt {
  count: number;
  firstAttempt: Date;
  lastAttempt: Date;
  blockedUntil?: Date;
}

@Injectable()
export class ProfanityRateLimitGuard implements CanActivate {
  private attempts: Map<string, ProfanityAttempt> = new Map();

  // Configuration
  private readonly MAX_ATTEMPTS = 3; // Maximum attempts before temporary block
  private readonly BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes
  private readonly RESET_WINDOW_MS = 60 * 60 * 1000; // 1 hour

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const clientIp = this.getClientIp(request);

    // Clean up old entries periodically
    this.cleanupOldEntries();

    const attempt = this.attempts.get(clientIp);

    // Check if client is currently blocked
    if (attempt?.blockedUntil && new Date() < attempt.blockedUntil) {
      const remainingMinutes = Math.ceil(
        (attempt.blockedUntil.getTime() - Date.now()) / (60 * 1000),
      );

      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: `Acceso temporalmente bloqueado debido a múltiples intentos de envío de contenido inapropiado. Intente nuevamente en ${remainingMinutes} minuto(s).`,
          error: 'Too Many Requests',
          blockedUntil: attempt.blockedUntil,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }

  recordProfanityAttempt(clientIp: string): void {
    const now = new Date();
    const attempt = this.attempts.get(clientIp);

    if (!attempt) {
      // First offense
      this.attempts.set(clientIp, {
        count: 1,
        firstAttempt: now,
        lastAttempt: now,
      });
      return;
    }

    // Check if we should reset the counter (after RESET_WINDOW_MS)
    const timeSinceFirst = now.getTime() - attempt.firstAttempt.getTime();
    if (timeSinceFirst > this.RESET_WINDOW_MS) {
      // Reset counter
      this.attempts.set(clientIp, {
        count: 1,
        firstAttempt: now,
        lastAttempt: now,
      });
      return;
    }

    // Increment counter
    attempt.count++;
    attempt.lastAttempt = now;

    // Check if we should block
    if (attempt.count >= this.MAX_ATTEMPTS) {
      attempt.blockedUntil = new Date(now.getTime() + this.BLOCK_DURATION_MS);
    }

    this.attempts.set(clientIp, attempt);
  }

  getAttemptInfo(clientIp: string): ProfanityAttempt | null {
    return this.attempts.get(clientIp) || null;
  }

  private getClientIp(request: Request): string {
    // Try to get real IP from various headers (for proxy/load balancer scenarios)
    const forwarded = request.headers['x-forwarded-for'];
    if (forwarded) {
      return (forwarded as string).split(',')[0].trim();
    }

    const realIp = request.headers['x-real-ip'];
    if (realIp) {
      return realIp as string;
    }

    return request.ip || 'unknown';
  }

  private cleanupOldEntries(): void {
    const now = new Date();
    const entriesToDelete: string[] = [];

    this.attempts.forEach((attempt, ip) => {
      // Remove entries older than RESET_WINDOW_MS and not currently blocked
      const timeSinceFirst = now.getTime() - attempt.firstAttempt.getTime();
      const isBlocked = attempt.blockedUntil && now < attempt.blockedUntil;

      if (timeSinceFirst > this.RESET_WINDOW_MS && !isBlocked) {
        entriesToDelete.push(ip);
      }
    });

    entriesToDelete.forEach((ip) => this.attempts.delete(ip));
  }
}
