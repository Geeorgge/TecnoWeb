import { Test, TestingModule } from '@nestjs/testing';
import { NotificationListener } from './notification.listener';
import { GoogleSheetsService } from '../services/google-sheets.service';
import { WhatsAppService } from '../services/whatsapp.service';
import { ServicioCreatedEvent } from '../../servicios/events/servicio-created.event';
import {
  Servicio,
  EstadoServicio,
  TipoElectrodomestico,
  Urgencia
} from '../../servicios/entities/servicio.entity';

describe('NotificationListener', () => {
  let listener: NotificationListener;
  let googleSheetsService: GoogleSheetsService;
  let whatsAppService: WhatsAppService;

  const mockGoogleSheetsService = {
    appendRow: jest.fn(),
  };

  const mockWhatsAppService = {
    sendNotification: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationListener,
        {
          provide: GoogleSheetsService,
          useValue: mockGoogleSheetsService,
        },
        {
          provide: WhatsAppService,
          useValue: mockWhatsAppService,
        },
      ],
    }).compile();

    listener = module.get<NotificationListener>(NotificationListener);
    googleSheetsService = module.get<GoogleSheetsService>(GoogleSheetsService);
    whatsAppService = module.get<WhatsAppService>(WhatsAppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleServicioCreated', () => {
    it('should send notifications to both Google Sheets and WhatsApp', async () => {
      const mockServicio: Partial<Servicio> = {
        id: 1,
        clienteId: 1,
        tipoElectrodomestico: TipoElectrodomestico.REFRIGERADOR,
        marca: 'Samsung',
        modelo: 'RF28R7201SR',
        problema: 'No enfría correctamente',
        urgencia: Urgencia.ALTA,
        ubicacionServicio: 'Cocina',
        estado: EstadoServicio.PENDIENTE,
        cliente: {
          id: 1,
          nombre: 'Juan Pérez',
          telefono: '8441234567',
          email: 'juan@example.com',
          direccion: 'Calle Principal 123',
          createdAt: new Date(),
          updatedAt: new Date(),
          servicios: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const event = new ServicioCreatedEvent(mockServicio as Servicio);

      mockGoogleSheetsService.appendRow.mockResolvedValue(undefined);
      mockWhatsAppService.sendNotification.mockResolvedValue(undefined);

      await listener.handleServicioCreated(event);

      expect(googleSheetsService.appendRow).toHaveBeenCalledWith(
        expect.objectContaining({
          cliente: 'Juan Pérez',
          telefono: '8441234567',
          email: 'juan@example.com',
          direccion: 'Calle Principal 123',
          tipoElectrodomestico: TipoElectrodomestico.REFRIGERADOR,
          marca: 'Samsung',
          modelo: 'RF28R7201SR',
          problema: 'No enfría correctamente',
          urgencia: Urgencia.ALTA,
          ubicacionServicio: 'Cocina',
        }),
      );

      expect(whatsAppService.sendNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          cliente: 'Juan Pérez',
          telefono: '8441234567',
          tipoElectrodomestico: TipoElectrodomestico.REFRIGERADOR,
          problema: 'No enfría correctamente',
          urgencia: Urgencia.ALTA,
        }),
      );
    });

    it('should continue if Google Sheets fails', async () => {
      const mockServicio: Partial<Servicio> = {
        id: 1,
        clienteId: 1,
        tipoElectrodomestico: TipoElectrodomestico.LAVADORA,
        problema: 'No centrifuga',
        urgencia: Urgencia.MEDIA,
        estado: EstadoServicio.PENDIENTE,
        cliente: {
          id: 1,
          nombre: 'María García',
          telefono: '8449876543',
          email: 'maria@example.com',
          direccion: 'Av. Secundaria 456',
          createdAt: new Date(),
          updatedAt: new Date(),
          servicios: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const event = new ServicioCreatedEvent(mockServicio as Servicio);

      mockGoogleSheetsService.appendRow.mockRejectedValue(
        new Error('Google Sheets API error'),
      );
      mockWhatsAppService.sendNotification.mockResolvedValue(undefined);

      // Should not throw
      await expect(
        listener.handleServicioCreated(event),
      ).resolves.not.toThrow();

      // WhatsApp should still be called
      expect(whatsAppService.sendNotification).toHaveBeenCalled();
    });

    it('should continue if WhatsApp fails', async () => {
      const mockServicio: Partial<Servicio> = {
        id: 1,
        clienteId: 1,
        tipoElectrodomestico: TipoElectrodomestico.ESTUFA,
        problema: 'No enciende',
        urgencia: Urgencia.BAJA,
        estado: EstadoServicio.PENDIENTE,
        cliente: {
          id: 1,
          nombre: 'Carlos López',
          telefono: '8445556677',
          email: 'carlos@example.com',
          direccion: 'Calle Tercera 789',
          createdAt: new Date(),
          updatedAt: new Date(),
          servicios: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const event = new ServicioCreatedEvent(mockServicio as Servicio);

      mockGoogleSheetsService.appendRow.mockResolvedValue(undefined);
      mockWhatsAppService.sendNotification.mockRejectedValue(
        new Error('WhatsApp API error'),
      );

      // Should not throw
      await expect(
        listener.handleServicioCreated(event),
      ).resolves.not.toThrow();

      // Google Sheets should still be called
      expect(googleSheetsService.appendRow).toHaveBeenCalled();
    });

    it('should handle both services failing gracefully', async () => {
      const mockServicio: Partial<Servicio> = {
        id: 1,
        clienteId: 1,
        tipoElectrodomestico: TipoElectrodomestico.MICROONDAS,
        problema: 'No calienta',
        urgencia: Urgencia.MEDIA,
        estado: EstadoServicio.PENDIENTE,
        cliente: {
          id: 1,
          nombre: 'Ana Martínez',
          telefono: '8442223344',
          email: 'ana@example.com',
          direccion: 'Blvd Principal 321',
          createdAt: new Date(),
          updatedAt: new Date(),
          servicios: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const event = new ServicioCreatedEvent(mockServicio as Servicio);

      mockGoogleSheetsService.appendRow.mockRejectedValue(
        new Error('Google Sheets error'),
      );
      mockWhatsAppService.sendNotification.mockRejectedValue(
        new Error('WhatsApp error'),
      );

      // Should not throw even if both fail
      await expect(
        listener.handleServicioCreated(event),
      ).resolves.not.toThrow();
    });

    it('should format fechaSolicitud in Mexico City timezone', async () => {
      const mockServicio: Partial<Servicio> = {
        id: 1,
        clienteId: 1,
        tipoElectrodomestico: TipoElectrodomestico.REFRIGERADOR,
        problema: 'Test',
        urgencia: Urgencia.MEDIA,
        estado: EstadoServicio.PENDIENTE,
        cliente: {
          id: 1,
          nombre: 'Test User',
          telefono: '8441111111',
          email: 'test@example.com',
          direccion: 'Test Address',
          createdAt: new Date(),
          updatedAt: new Date(),
          servicios: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const event = new ServicioCreatedEvent(mockServicio as Servicio);

      mockGoogleSheetsService.appendRow.mockResolvedValue(undefined);
      mockWhatsAppService.sendNotification.mockResolvedValue(undefined);

      await listener.handleServicioCreated(event);

      expect(googleSheetsService.appendRow).toHaveBeenCalledWith(
        expect.objectContaining({
          fechaSolicitud: expect.any(String),
        }),
      );

      // Verify the date was formatted
      const callArgs = mockGoogleSheetsService.appendRow.mock.calls[0][0];
      expect(callArgs.fechaSolicitud).toBeTruthy();
    });
  });
});
