import { IsIn, IsString, MaxLength } from 'class-validator';

export class LogContactDto {
  @IsIn(['WhatsApp', 'Llamar'])
  tipo: 'WhatsApp' | 'Llamar';

  @IsString()
  @MaxLength(50)
  pagina: string;

  @IsIn(['Móvil', 'Tablet', 'Escritorio'])
  dispositivo: 'Móvil' | 'Tablet' | 'Escritorio';
}
