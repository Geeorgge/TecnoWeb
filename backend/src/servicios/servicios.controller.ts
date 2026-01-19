import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { EstadoServicio } from './entities/servicio.entity';
import { ProfanityRateLimitGuard } from '../common/guards/profanity-rate-limit.guard';
import { ProfanityLoggerInterceptor } from '../common/interceptors/profanity-logger.interceptor';
import { RateLimitGuard } from '../common/guards/rate-limit.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post()
  @UseGuards(RateLimitGuard, ProfanityRateLimitGuard)
  @UseInterceptors(ProfanityLoggerInterceptor)
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.create(createServicioDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query('estado') estado?: EstadoServicio) {
    return this.serviciosService.findAll(estado);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviciosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateServicioDto: UpdateServicioDto) {
    return this.serviciosService.update(+id, updateServicioDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.serviciosService.remove(+id);
  }

  @Get('cliente/:clienteId')
  @UseGuards(JwtAuthGuard)
  findByCliente(@Param('clienteId') clienteId: string) {
    return this.serviciosService.findByCliente(+clienteId);
  }
}
