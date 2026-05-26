import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';

// Separate guard with generous limits so legitimate button clicks are never blocked.
// Limits: 30 requests per 5 minutes per IP.
@Injectable()
export class ContactLogRateLimitGuard implements CanActivate {
  private readonly requests = new Map<string, { count: number; windowStart: number }>();
  private readonly MAX = 30;
  private readonly WINDOW_MS = 5 * 60 * 1000;

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const ip = this.getIp(req);
    const now = Date.now();
    const entry = this.requests.get(ip);

    if (!entry || now - entry.windowStart > this.WINDOW_MS) {
      this.requests.set(ip, { count: 1, windowStart: now });
      return true;
    }

    entry.count++;
    if (entry.count > this.MAX) {
      throw new HttpException({ statusCode: 429, message: 'Too many requests' }, HttpStatus.TOO_MANY_REQUESTS);
    }
    return true;
  }

  private getIp(req: Request): string {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) return (forwarded as string).split(',')[0].trim();
    return req.ip || 'unknown';
  }
}
