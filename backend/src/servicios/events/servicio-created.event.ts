import { Servicio } from '../entities/servicio.entity';

export class ServicioCreatedEvent {
  constructor(public readonly servicio: Servicio) {}
}
