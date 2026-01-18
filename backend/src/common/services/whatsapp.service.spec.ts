import { Test, TestingModule } from '@nestjs/testing';
import { WhatsAppService } from './whatsapp.service';
import { CostMonitorService } from './cost-monitor.service';

describe('WhatsAppService', () => {
  let service: WhatsAppService;

  const mockCostMonitorService = {
    canSendMessage: jest.fn().mockResolvedValue({ allowed: true, reason: 'OK' }),
    recordMessageSent: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    // Set environment variables for testing
    process.env.WHATSAPP_NOTIFICATIONS_ENABLED = 'false';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsAppService,
        {
          provide: CostMonitorService,
          useValue: mockCostMonitorService,
        },
      ],
    }).compile();

    service = module.get<WhatsAppService>(WhatsAppService);
  });

  describe('sendNotification', () => {
    it('should return early when WhatsApp is disabled', async () => {
      process.env.WHATSAPP_NOTIFICATIONS_ENABLED = 'false';

      const data = {
        cliente: 'Test Cliente',
        telefono: '8441234567',
        tipoElectrodomestico: 'REFRIGERADOR',
        problema: 'No enfría',
        urgencia: 'ALTA',
      };

      // Should not throw when disabled
      await expect(service.sendNotification(data)).resolves.not.toThrow();
    });

    it('should return early when admin phone is not configured', async () => {
      process.env.WHATSAPP_NOTIFICATIONS_ENABLED = 'true';
      delete process.env.WHATSAPP_ADMIN_PHONE;

      const data = {
        cliente: 'Test Cliente',
        telefono: '8441234567',
        tipoElectrodomestico: 'REFRIGERADOR',
        problema: 'No enfría',
        urgencia: 'ALTA',
      };

      // Should not throw when admin phone is missing
      await expect(service.sendNotification(data)).resolves.not.toThrow();
    });

    it('should handle data with all fields', async () => {
      process.env.WHATSAPP_NOTIFICATIONS_ENABLED = 'false';

      const data = {
        cliente: 'Juan Pérez',
        telefono: '8449876543',
        tipoElectrodomestico: 'LAVADORA',
        problema: 'No centrifuga bien',
        urgencia: 'MEDIA',
        ubicacionServicio: 'Lavandería del segundo piso',
      };

      await expect(service.sendNotification(data)).resolves.not.toThrow();
    });

    it('should handle data with minimal fields', async () => {
      process.env.WHATSAPP_NOTIFICATIONS_ENABLED = 'false';

      const data = {
        cliente: 'María García',
        telefono: '8445556677',
        tipoElectrodomestico: 'ESTUFA',
        problema: 'No enciende',
        urgencia: 'BAJA',
      };

      await expect(service.sendNotification(data)).resolves.not.toThrow();
    });
  });

  describe('sendViaTwilio', () => {
    it('should return early when Twilio credentials are not configured', async () => {
      delete process.env.TWILIO_ACCOUNT_SID;
      delete process.env.TWILIO_AUTH_TOKEN;

      const data = {
        cliente: 'Test',
        telefono: '8441234567',
        tipoElectrodomestico: 'REFRIGERADOR',
        problema: 'Test',
        urgencia: 'MEDIA',
      };

      // Should not throw when Twilio not configured
      await expect(service.sendViaTwilio(data)).resolves.not.toThrow();
    });
  });
});
