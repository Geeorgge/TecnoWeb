import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiciosService } from './servicios.service';
import { Servicio, EstadoServicio, TipoElectrodomestico, Urgencia } from './entities/servicio.entity';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { NotFoundException } from '@nestjs/common';

describe('ServiciosService', () => {
  let service: ServiciosService;
  let repository: Repository<Servicio>;
  let eventEmitter: EventEmitter2;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const mockEventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiciosService,
        {
          provide: getRepositoryToken(Servicio),
          useValue: mockRepository,
        },
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter,
        },
      ],
    }).compile();

    service = module.get<ServiciosService>(ServiciosService);
    repository = module.get<Repository<Servicio>>(getRepositoryToken(Servicio));
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a servicio and emit event', async () => {
      const createDto: CreateServicioDto = {
        clienteId: 1,
        tipoElectrodomestico: TipoElectrodomestico.REFRIGERADOR,
        problema: 'No enfría',
        urgencia: Urgencia.MEDIA,
      };

      const mockServicio = {
        id: 1,
        ...createDto,
        estado: EstadoServicio.PENDIENTE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockServicioConCliente = {
        ...mockServicio,
        cliente: {
          id: 1,
          nombre: 'Juan Pérez',
          telefono: '8441234567',
          email: 'juan@example.com',
          direccion: 'Calle Principal 123',
        },
      };

      mockRepository.create.mockReturnValue(mockServicio);
      mockRepository.save.mockResolvedValue(mockServicio);
      mockRepository.findOne.mockResolvedValue(mockServicioConCliente);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(mockServicio);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: mockServicio.id },
        relations: ['cliente'],
      });
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'servicio.created',
        expect.any(Object),
      );
      expect(result).toEqual(mockServicio);
    });
  });

  describe('findAll', () => {
    it('should return all servicios when no estado is provided', async () => {
      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      };

      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      await service.findAll();

      expect(repository.createQueryBuilder).toHaveBeenCalledWith('servicio');
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'servicio.cliente',
        'cliente',
      );
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        'servicio.fechaPreferida',
        'ASC',
      );
      expect(mockQueryBuilder.where).not.toHaveBeenCalled();
    });

    it('should filter by estado when provided', async () => {
      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      };

      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      await service.findAll(EstadoServicio.PENDIENTE);

      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'servicio.estado = :estado',
        { estado: EstadoServicio.PENDIENTE },
      );
    });
  });

  describe('findOne', () => {
    it('should return a servicio when found', async () => {
      const mockServicio = {
        id: 1,
        clienteId: 1,
        tipoElectrodomestico: TipoElectrodomestico.REFRIGERADOR,
        problema: 'No enfría',
        estado: EstadoServicio.PENDIENTE,
        cliente: {
          id: 1,
          nombre: 'Juan Pérez',
        },
      };

      mockRepository.findOne.mockResolvedValue(mockServicio);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['cliente'],
      });
      expect(result).toEqual(mockServicio);
    });

    it('should throw NotFoundException when servicio not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'Servicio con ID 999 no encontrado',
      );
    });
  });

  describe('update', () => {
    it('should update a servicio', async () => {
      const mockServicio = {
        id: 1,
        clienteId: 1,
        tipoElectrodomestico: TipoElectrodomestico.REFRIGERADOR,
        problema: 'No enfría',
        estado: EstadoServicio.PENDIENTE,
      };

      const updateDto = {
        estado: EstadoServicio.EN_PROCESO,
      };

      const updatedServicio = {
        ...mockServicio,
        ...updateDto,
      };

      mockRepository.findOne.mockResolvedValue(mockServicio);
      mockRepository.save.mockResolvedValue(updatedServicio);

      const result = await service.update(1, updateDto);

      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalledWith(updatedServicio);
      expect(result.estado).toEqual(EstadoServicio.EN_PROCESO);
    });
  });

  describe('remove', () => {
    it('should remove a servicio', async () => {
      const mockServicio = {
        id: 1,
        clienteId: 1,
        tipoElectrodomestico: TipoElectrodomestico.REFRIGERADOR,
      };

      mockRepository.findOne.mockResolvedValue(mockServicio);
      mockRepository.remove.mockResolvedValue(mockServicio);

      await service.remove(1);

      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.remove).toHaveBeenCalledWith(mockServicio);
    });

    it('should throw NotFoundException when trying to remove non-existent servicio', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByCliente', () => {
    it('should return servicios for a specific cliente', async () => {
      const mockServicios = [
        {
          id: 1,
          clienteId: 1,
          tipoElectrodomestico: TipoElectrodomestico.REFRIGERADOR,
        },
        {
          id: 2,
          clienteId: 1,
          tipoElectrodomestico: TipoElectrodomestico.LAVADORA,
        },
      ];

      mockRepository.find.mockResolvedValue(mockServicios);

      const result = await service.findByCliente(1);

      expect(repository.find).toHaveBeenCalledWith({
        where: { clienteId: 1 },
        relations: ['cliente'],
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual(mockServicios);
      expect(result).toHaveLength(2);
    });
  });
});
