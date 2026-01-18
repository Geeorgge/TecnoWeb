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

export interface Cliente {
  id: number
  nombre: string
  telefono: string
  email?: string
  direccion?: string
  createdAt: string
  updatedAt: string
}

export interface Servicio {
  id: number
  clienteId: number
  tipoElectrodomestico: TipoElectrodomestico
  marca?: string
  modelo?: string
  problema: string
  fechaPreferida?: string
  ubicacionServicio?: string
  urgencia: Urgencia
  estado: EstadoServicio
  notasTecnico?: string
  costoEstimado?: number
  costoFinal?: number
  createdAt: string
  updatedAt: string
  cliente?: Cliente
}

export interface CreateClienteDto {
  nombre: string
  telefono: string
  email?: string
  direccion?: string
}

export interface CreateServicioDto {
  clienteId: number
  tipoElectrodomestico: TipoElectrodomestico
  marca?: string
  modelo?: string
  problema: string
  fechaPreferida?: string
  ubicacionServicio?: string
  urgencia?: Urgencia
}

export interface SolicitudServicioForm {
  // Datos del cliente
  nombreCliente: string
  telefono: string
  email?: string
  direccion?: string

  // Datos del electrodoméstico
  tipoElectrodomestico: TipoElectrodomestico
  marca?: string
  modelo?: string
  problema: string

  // Preferencias de servicio
  fechaPreferida?: string
  ubicacionServicio?: string
  urgencia: Urgencia
}
