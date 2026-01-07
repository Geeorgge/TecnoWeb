import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { Servicio } from './entities/servicio.entity';
import { ProfanityRateLimitGuard } from '../common/guards/profanity-rate-limit.guard';
import { ProfanityLoggerInterceptor } from '../common/interceptors/profanity-logger.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Servicio])],
  controllers: [ServiciosController],
  providers: [
    ServiciosService,
    ProfanityRateLimitGuard,
    ProfanityLoggerInterceptor,
  ],
  exports: [ServiciosService],
})
export class ServiciosModule {}
