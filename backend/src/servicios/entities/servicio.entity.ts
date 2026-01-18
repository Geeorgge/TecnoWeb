import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

export enum TipoElectrodomestico {
  LAVADORA = 'lavadora',
  SECADORA = 'secadora',
  REFRIGERADOR = 'refrigerador',
  CONGELADOR = 'congelador',
  OTRO = 'otro',
}

export enum Urgencia {
  BAJA = 'baja',
  MEDIA = 'media',
  ALTA = 'alta',
}

export enum EstadoServicio {
  PENDIENTE = 'pendiente',
  PROGRAMADO = 'programado',
  EN_PROCESO = 'en_proceso',
  COMPLETADO = 'completado',
  CANCELADO = 'cancelado',
}

@Entity('servicio')
export class Servicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cliente_id' })
  clienteId: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.servicios, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({
    type: 'enum',
    enum: TipoElectrodomestico,
    name: 'tipo_electrodomestico',
  })
  tipoElectrodomestico: TipoElectrodomestico;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marca: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  modelo: string;

  @Column({ type: 'text' })
  problema: string;

  @Column({ type: 'datetime', nullable: true, name: 'fecha_preferida' })
  fechaPreferida: Date;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'ubicacion_servicio' })
  ubicacionServicio: string;

  @Column({
    type: 'enum',
    enum: Urgencia,
    default: Urgencia.MEDIA,
  })
  urgencia: Urgencia;

  @Column({
    type: 'enum',
    enum: EstadoServicio,
    default: EstadoServicio.PENDIENTE,
  })
  estado: EstadoServicio;

  @Column({ type: 'text', nullable: true, name: 'notas_tecnico' })
  notasTecnico: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, name: 'costo_estimado' })
  costoEstimado: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, name: 'costo_final' })
  costoFinal: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
