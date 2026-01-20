import { IsString, IsNotEmpty, IsEmail, IsOptional, Length, Matches } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Length(2, 255, { message: 'El nombre debe tener entre 2 y 255 caracteres' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @Length(10, 15, { message: 'El teléfono debe tener entre 10 y 15 dígitos' })
  @Matches(/^[0-9]+$/, { message: 'El teléfono solo debe contener números' })
  telefono: string;

  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  direccion?: string;
}
