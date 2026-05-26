import { Controller, Post, Body, Get, UseGuards, Request, HttpCode, HttpStatus, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RateLimitGuard } from '../common/guards/rate-limit.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RateLimitGuard)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: { userId: string; username: string; role: string } }) {
    return {
      userId: req.user.userId,
      username: req.user.username,
      role: req.user.role,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  verifyToken() {
    return { valid: true };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  logout(@Headers('authorization') authHeader: string): { success: boolean } {
    const token = authHeader?.replace('Bearer ', '');
    if (token) {
      this.authService.logout(token);
    }
    return { success: true };
  }
}
