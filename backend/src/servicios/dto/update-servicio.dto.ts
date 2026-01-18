import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsNumber, IsString } from 'class-validator';
import { CreateServicioDto } from './create-servicio.dto';
import { EstadoServicio } from '../entities/servicio.entity';

export class UpdateServicioDto extends PartialType(CreateServicioDto) {
  @IsEnum(EstadoServicio, { message: 'Estado de servicio no válido' })
  @IsOptional()
  estado?: EstadoServicio;

  @IsString()
  @IsOptional()
  notasTecnico?: string;

  @IsNumber()
  @IsOptional()
  costoEstimado?: number;

  @IsNumber()
  @IsOptional()
  costoFinal?: number;
}
