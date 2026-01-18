import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleSheetsService } from './common/services/google-sheets.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly googleSheetsService: GoogleSheetsService,
  ) {}

  @Get()
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('health')
  healthCheck(): object {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Techno Hogar API',
    };
  }

  @Get('format-sheets')
  async formatGoogleSheets(): Promise<object> {
    try {
      await this.googleSheetsService.createHeaderRow();
      return {
        success: true,
        message: 'Google Sheets formateado correctamente',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al formatear Google Sheets',
        error: error.message,
      };
    }
  }
}
