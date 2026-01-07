import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
  IsDateString,
  Length,
} from 'class-validator';
import { TipoElectrodomestico, Urgencia } from '../entities/servicio.entity';
import { NoProfanity } from '../../common/validators/profanity-filter.validator';

export class CreateServicioDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El ID del cliente es obligatorio' })
  clienteId: number;

  @IsEnum(TipoElectrodomestico, {
    message: 'Tipo de electrodoméstico no válido',
  })
  @IsNotEmpty({ message: 'El tipo de electrodoméstico es obligatorio' })
  tipoElectrodomestico: TipoElectrodomestico;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  @NoProfanity({ message: 'La marca contiene lenguaje inapropiado' })
  marca?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  @NoProfanity({ message: 'El modelo contiene lenguaje inapropiado' })
  modelo?: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción del problema es obligatoria' })
  @NoProfanity({ message: 'La descripción contiene lenguaje inapropiado' })
  problema: string;

  @IsDateString()
  @IsOptional()
  fechaPreferida?: string;

  @IsString()
  @IsOptional()
  @NoProfanity({ message: 'La ubicación contiene lenguaje inapropiado' })
  ubicacionServicio?: string;

  @IsEnum(Urgencia, { message: 'Nivel de urgencia no válido' })
  @IsOptional()
  urgencia?: Urgencia;
}
