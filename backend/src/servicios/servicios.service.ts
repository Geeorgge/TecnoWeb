import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Servicio, EstadoServicio } from './entities/servicio.entity';
import { ServicioCreatedEvent } from './events/servicio-created.event';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createServicioDto: CreateServicioDto): Promise<Servicio> {
    const servicio = this.servicioRepository.create(createServicioDto);
    const savedServicio = await this.servicioRepository.save(servicio);

    // Load client relation
    const servicioConCliente = await this.servicioRepository.findOne({
      where: { id: savedServicio.id },
      relations: ['cliente'],
    });

    // Emit event for notification listeners
    this.eventEmitter.emit(
      'servicio.created',
      new ServicioCreatedEvent(servicioConCliente),
    );

    return savedServicio;
  }

  async findAll(estado?: EstadoServicio): Promise<Servicio[]> {
    const queryBuilder = this.servicioRepository
      .createQueryBuilder('servicio')
      .leftJoinAndSelect('servicio.cliente', 'cliente')
      .orderBy('servicio.fechaPreferida', 'ASC');

    if (estado) {
      queryBuilder.where('servicio.estado = :estado', { estado });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Servicio> {
    const servicio = await this.servicioRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }

    return servicio;
  }

  async update(id: number, updateServicioDto: UpdateServicioDto): Promise<Servicio> {
    const servicio = await this.findOne(id);
    Object.assign(servicio, updateServicioDto);
    return await this.servicioRepository.save(servicio);
  }

  async remove(id: number): Promise<void> {
    const servicio = await this.findOne(id);
    await this.servicioRepository.remove(servicio);
  }

  async findByCliente(clienteId: number): Promise<Servicio[]> {
    return await this.servicioRepository.find({
      where: { clienteId },
      relations: ['cliente'],
      order: { createdAt: 'DESC' },
    });
  }
}
