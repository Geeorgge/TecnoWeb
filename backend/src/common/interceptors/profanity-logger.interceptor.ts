import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Request } from 'express';
import { ProfanityRateLimitGuard } from '../guards/profanity-rate-limit.guard';

@Injectable()
export class ProfanityLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ProfanityLoggerInterceptor.name);

  constructor(private readonly rateLimitGuard: ProfanityRateLimitGuard) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        // Check if this is a profanity validation error
        if (this.isProfanityError(error)) {
          const request = context.switchToHttp().getRequest<Request>();
          const clientIp = this.getClientIp(request);

          // Record the attempt
          this.rateLimitGuard.recordProfanityAttempt(clientIp);

          // Get attempt info
          const attemptInfo = this.rateLimitGuard.getAttemptInfo(clientIp);

          // Log the incident
          this.logger.warn(
            `Profanity attempt detected from IP: ${clientIp} | ` +
              `Attempt ${attemptInfo?.count || 1}/3 | ` +
              `Endpoint: ${request.method} ${request.path} | ` +
              `User-Agent: ${request.headers['user-agent'] || 'unknown'}`,
          );

          // Log the specific fields that contained profanity
          if (error.response?.message) {
            const messages = Array.isArray(error.response.message)
              ? error.response.message
              : [error.response.message];

            const profanityFields = messages
              .filter((msg: string) => msg.includes('lenguaje inapropiado'))
              .map((msg: string) => {
                // Extract field name from message
                const match = msg.match(/^(.*?)\s+contiene/);
                return match ? match[1] : 'unknown field';
              });

            if (profanityFields.length > 0) {
              this.logger.warn(
                `Fields with profanity: ${profanityFields.join(', ')} | IP: ${clientIp}`,
              );
            }
          }

          // Enhance error message with attempt counter
          if (attemptInfo && attemptInfo.count >= 2) {
            const remainingAttempts = 3 - attemptInfo.count;
            const enhancedMessage = Array.isArray(error.response.message)
              ? error.response.message
              : [error.response.message];

            enhancedMessage.push(
              `⚠️ Advertencia: ${remainingAttempts} intento(s) restante(s) antes de bloqueo temporal de 15 minutos.`,
            );

            error.response.message = enhancedMessage;
          }

          // If this was the 3rd attempt, they'll be blocked on next request
          if (attemptInfo && attemptInfo.count >= 3) {
            this.logger.error(
              `IP ${clientIp} has been temporarily blocked due to repeated profanity attempts`,
            );
          }
        }

        return throwError(() => error);
      }),
    );
  }

  private isProfanityError(error: any): boolean {
    if (!(error instanceof BadRequestException)) {
      return false;
    }

    const message = error.getResponse();
    if (typeof message === 'object' && 'message' in message) {
      const messages = Array.isArray(message.message)
        ? message.message
        : [message.message];

      return messages.some((msg: string) =>
        msg.includes('lenguaje inapropiado'),
      );
    }

    return false;
  }

  private getClientIp(request: Request): string {
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
}
