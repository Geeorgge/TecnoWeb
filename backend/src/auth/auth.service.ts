import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { TokenBlacklistService } from './token-blacklist.service';

interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  role: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly adminUsers: Map<string, AdminUser>;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private tokenBlacklist: TokenBlacklistService,
  ) {
    // Initialize admin users from environment or use default
    // In production, this should be stored in database
    this.adminUsers = this.initializeAdminUsers();
  }

  private initializeAdminUsers(): Map<string, AdminUser> {
    const users = new Map<string, AdminUser>();

    // Get admin credentials from environment - REQUIRED in production
    const adminUsername = this.configService.get<string>('ADMIN_USERNAME');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

    if (!adminUsername || !adminPassword) {
      this.logger.error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in environment variables');
      throw new Error('Missing required admin credentials in environment');
    }

    // Hash the password (sync for initialization)
    const passwordHash = bcrypt.hashSync(adminPassword, 10);

    users.set(adminUsername, {
      id: '1',
      username: adminUsername,
      passwordHash,
      role: 'admin',
    });

    this.logger.log(`Admin user initialized: ${adminUsername}`);
    return users;
  }

  async validateUser(loginDto: LoginDto): Promise<AdminUser | null> {
    const user = this.adminUsers.get(loginDto.username);

    if (!user) {
      this.logger.warn(`Login attempt with invalid username: ${loginDto.username}`);
      return null;
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);

    if (!isPasswordValid) {
      this.logger.warn(`Login attempt with invalid password for user: ${loginDto.username}`);
      return null;
    }

    return user;
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string; user: { username: string; role: string } }> {
    const user = await this.validateUser(loginDto);

    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    this.logger.log(`User ${user.username} logged in successfully`);

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        username: user.username,
        role: user.role,
      },
    };
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token);
      return true;
    } catch {
      return false;
    }
  }

  logout(token: string): void {
    try {
      const decoded = this.jwtService.decode(token) as { exp?: number } | null;
      const expiresAt = decoded?.exp ? decoded.exp * 1000 : Date.now() + 8 * 60 * 60 * 1000;
      this.tokenBlacklist.add(token, expiresAt);
      this.logger.log('User logged out, token blacklisted');
    } catch {
      // Decode failure is non-fatal — token is effectively gone when client discards it
    }
  }
}
