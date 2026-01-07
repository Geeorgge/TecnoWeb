import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSheetsService } from './google-sheets.service';

describe('GoogleSheetsService', () => {
  let service: GoogleSheetsService;

  beforeEach(async () => {
    // Set environment variables for testing
    process.env.GOOGLE_SHEETS_ENABLED = 'false';

    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleSheetsService],
    }).compile();

    service = module.get<GoogleSheetsService>(GoogleSheetsService);
  });

  describe('appendRow', () => {
    it('should return early when Google Sheets is disabled', async () => {
      process.env.GOOGLE_SHEETS_ENABLED = 'false';

      const data = {
        cliente: 'Test Cliente',
        telefono: '8441234567',
        email: 'test@example.com',
        direccion: 'Test Address',
        tipoElectrodomestico: 'REFRIGERADOR',
        marca: 'Samsung',
        modelo: 'RF28R7201SR',
        problema: 'No enfría',
        ubicacionServicio: 'Cocina',
        urgencia: 'ALTA',
        fechaSolicitud: new Date().toISOString(),
      };

      // Should not throw when disabled
      await expect(service.appendRow(data)).resolves.not.toThrow();
    });

    it('should handle all required fields', async () => {
      const data = {
        cliente: 'Juan Pérez',
        telefono: '8449876543',
        email: 'juan@example.com',
        direccion: 'Calle Principal 123',
        tipoElectrodomestico: 'LAVADORA',
        marca: 'LG',
        modelo: 'WM3900HWA',
        problema: 'No centrifuga',
        ubicacionServicio: 'Lavandería',
        urgencia: 'MEDIA',
        fechaSolicitud: new Date().toISOString(),
      };

      // Should not throw
      await expect(service.appendRow(data)).resolves.not.toThrow();
    });

    it('should handle optional fields being undefined', async () => {
      const data = {
        cliente: 'María García',
        telefono: '8445556677',
        tipoElectrodomestico: 'ESTUFA',
        problema: 'No enciende',
        urgencia: 'BAJA',
        fechaSolicitud: new Date().toISOString(),
      };

      // Should not throw with minimal data
      await expect(service.appendRow(data)).resolves.not.toThrow();
    });
  });

  describe('createHeaderRow', () => {
    it('should return early when Google Sheets is disabled', async () => {
      process.env.GOOGLE_SHEETS_ENABLED = 'false';

      // Should not throw when disabled
      await expect(service.createHeaderRow()).resolves.not.toThrow();
    });
  });
});
