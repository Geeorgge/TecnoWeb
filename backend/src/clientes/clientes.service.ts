import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    // Si tiene email, verificar si ya existe un cliente con ese email
    if (createClienteDto.email) {
      const clienteExistente = await this.clienteRepository.findOne({
        where: { email: createClienteDto.email },
      });

      if (clienteExistente) {
        // Cliente ya existe, retornarlo (evita duplicados)
        return clienteExistente;
      }
    }

    // Si tiene teléfono, verificar si ya existe (fallback si no hay email)
    if (createClienteDto.telefono && !createClienteDto.email) {
      const clienteExistente = await this.clienteRepository.findOne({
        where: { telefono: createClienteDto.telefono },
      });

      if (clienteExistente) {
        // Cliente ya existe, retornarlo
        return clienteExistente;
      }
    }

    // Cliente no existe, crear nuevo
    const cliente = this.clienteRepository.create(createClienteDto);
    return await this.clienteRepository.save(cliente);
  }

  async findAll(search?: string): Promise<Cliente[]> {
    if (search) {
      return await this.clienteRepository.find({
        where: [
          { nombre: Like(`%${search}%`) },
          { telefono: Like(`%${search}%`) },
          { email: Like(`%${search}%`) },
        ],
        relations: ['servicios'],
        order: { createdAt: 'DESC' },
      });
    }

    return await this.clienteRepository.find({
      relations: ['servicios'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['servicios'],
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    Object.assign(cliente, updateClienteDto);
    return await this.clienteRepository.save(cliente);
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
  }
}
