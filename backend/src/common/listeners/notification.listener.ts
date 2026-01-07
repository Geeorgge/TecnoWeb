import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ServicioCreatedEvent } from '../../servicios/events/servicio-created.event';
import { GoogleSheetsService } from '../services/google-sheets.service';
import { WhatsAppService } from '../services/whatsapp.service';

@Injectable()
export class NotificationListener {
  private readonly logger = new Logger(NotificationListener.name);

  constructor(
    private readonly googleSheetsService: GoogleSheetsService,
    private readonly whatsAppService: WhatsAppService,
  ) {}

  @OnEvent('servicio.created', { async: true })
  async handleServicioCreated(event: ServicioCreatedEvent): Promise<void> {
    const servicio = event.servicio;

    const data = {
      cliente: servicio.cliente.nombre,
      telefono: servicio.cliente.telefono,
      email: servicio.cliente.email,
      direccion: servicio.cliente.direccion,
      tipoElectrodomestico: servicio.tipoElectrodomestico,
      marca: servicio.marca,
      modelo: servicio.modelo,
      problema: servicio.problema,
      ubicacionServicio: servicio.ubicacionServicio,
      urgencia: servicio.urgencia,
      fechaSolicitud: new Date().toLocaleString('es-MX', {
        timeZone: 'America/Mexico_City',
      }),
    };

    // Send to Google Sheets
    try {
      await this.googleSheetsService.appendRow(data);
      this.logger.log(`Google Sheets updated for service ID: ${servicio.id}`);
    } catch (error) {
      this.logger.error('Error saving to Google Sheets:', error);
    }

    // Send WhatsApp notification
    try {
      await this.whatsAppService.sendNotification(data);
      this.logger.log(`WhatsApp sent for service ID: ${servicio.id}`);
    } catch (error) {
      this.logger.error('Error sending WhatsApp:', error);
    }
  }
}
