import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

interface WhatsAppNotificationData {
  servicioId?: number;
  cliente: string;
  telefono: string;
  email?: string;
  tipoElectrodomestico: string;
  marca?: string;
  modelo?: string;
  problema: string;
  urgencia: string;
  ubicacionServicio?: string;
  direccion?: string;
  fechaPreferida?: string | Date;
}

@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name);

  async sendNotification(data: WhatsAppNotificationData): Promise<void> {
    if (process.env.WHATSAPP_NOTIFICATIONS_ENABLED !== 'true') {
      this.logger.warn('WhatsApp notifications are disabled');
      return;
    }

    const adminPhone = process.env.WHATSAPP_ADMIN_PHONE;
    const apiKey = process.env.CALLMEBOT_API_KEY;

    if (!adminPhone) {
      this.logger.error('WHATSAPP_ADMIN_PHONE is not configured');
      return;
    }

    if (!apiKey) {
      this.logger.error('CALLMEBOT_API_KEY is not configured');
      return;
    }

    try {
      const mensaje = this.formatMessage(data);
      const url = 'https://api.callmebot.com/whatsapp.php';

      const params = {
        phone: adminPhone,
        text: mensaje,
        apikey: apiKey,
      };

      await axios.get(url, { params });

      this.logger.log(`WhatsApp notification sent via CallMeBot for ${data.cliente}`);
    } catch (error) {
      this.logger.error('Error sending WhatsApp via CallMeBot');
      this.logger.error(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private formatMessage(data: WhatsAppNotificationData): string {
    const now = new Date();
    const fechaHora = now.toLocaleString('es-MX', {
      timeZone: 'America/Mexico_City',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const urgenciaEmoji =
      data.urgencia?.toLowerCase() === 'alta'
        ? '🚨'
        : data.urgencia?.toLowerCase() === 'media'
          ? '⚡'
          : '📌';

    let mensaje = `🔔 *Nueva Solicitud de Servicio - Tecno Hogar*\n\n`;

    if (data.servicioId) {
      mensaje += `📋 *Servicio #${data.servicioId}*\n`;
    }
    mensaje += `🕐 ${fechaHora}\n\n`;

    mensaje += `👤 *CLIENTE*\n`;
    mensaje += `Nombre: ${data.cliente}\n`;
    mensaje += `📱 Tel: ${data.telefono}\n`;
    if (data.email) {
      mensaje += `📧 Email: ${data.email}\n`;
    }

    mensaje += `\n🔧 *ELECTRODOMÉSTICO*\n`;
    mensaje += `Tipo: ${data.tipoElectrodomestico}\n`;
    if (data.marca) {
      mensaje += `Marca: ${data.marca}\n`;
    }
    if (data.modelo) {
      mensaje += `Modelo: ${data.modelo}\n`;
    }

    mensaje += `\n📍 *UBICACIÓN*\n`;
    if (data.direccion) {
      mensaje += `Dirección: ${data.direccion}\n`;
    }
    if (data.ubicacionServicio) {
      mensaje += `Ref: ${data.ubicacionServicio}\n`;
    }

    mensaje += `\n${urgenciaEmoji} *URGENCIA: ${data.urgencia?.toUpperCase()}* ${urgenciaEmoji}\n`;

    if (data.fechaPreferida) {
      const fechaPref = new Date(data.fechaPreferida);
      const fechaFormateada = fechaPref.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      mensaje += `📅 Fecha preferida: ${fechaFormateada}\n`;
    }

    mensaje += `\n📝 *PROBLEMA:*\n`;
    mensaje += `${data.problema}\n`;

    mensaje += `\n✅ Revisa el panel de administración para más detalles.`;

    return mensaje;
  }
}
