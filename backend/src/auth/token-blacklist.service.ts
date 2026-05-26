import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TokenBlacklistService {
  private readonly logger = new Logger(TokenBlacklistService.name);
  private readonly blacklist = new Map<string, number>(); // token → expiry ms

  constructor() {
    setInterval(() => this.cleanup(), 60 * 60 * 1000);
  }

  add(token: string, expiresAt: number): void {
    this.blacklist.set(token, expiresAt);
    this.logger.log('Token blacklisted');
  }

  has(token: string): boolean {
    const exp = this.blacklist.get(token);
    if (exp === undefined) return false;
    if (Date.now() > exp) {
      this.blacklist.delete(token);
      return false;
    }
    return true;
  }

  private cleanup(): void {
    const now = Date.now();
    let removed = 0;
    for (const [token, exp] of this.blacklist) {
      if (now > exp) {
        this.blacklist.delete(token);
        removed++;
      }
    }
    if (removed > 0) {
      this.logger.log(`Cleaned up ${removed} expired token(s) from blacklist`);
    }
  }
}
