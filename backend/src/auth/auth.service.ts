import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

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
  ) {
    // Initialize admin users from environment or use default
    // In production, this should be stored in database
    this.adminUsers = this.initializeAdminUsers();
  }

  private initializeAdminUsers(): Map<string, AdminUser> {
    const users = new Map<string, AdminUser>();

    // Get admin credentials from environment
    const adminUsername = this.configService.get<string>('ADMIN_USERNAME') || 'admin';
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD') || 'techno2024';

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
}
