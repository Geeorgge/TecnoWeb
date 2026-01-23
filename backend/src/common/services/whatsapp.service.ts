import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { CostMonitorService } from './cost-monitor.service';

@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name);

  constructor(private readonly costMonitor: CostMonitorService) {}

  async sendNotification(data: {
    cliente: string;
    telefono: string;
    tipoElectrodomestico: string;
    problema: string;
    urgencia: string;
    ubicacionServicio?: string;
  }): Promise<void> {
    if (process.env.WHATSAPP_NOTIFICATIONS_ENABLED !== 'true') {
      this.logger.warn('WhatsApp notifications are disabled');
      return;
    }

    const adminPhone = process.env.WHATSAPP_ADMIN_PHONE;

    if (!adminPhone) {
      this.logger.error('WHATSAPP_ADMIN_PHONE is not configured');
      return;
    }

    // Verificar límite de costos ANTES de enviar
    const costCheck = await this.costMonitor.canSendMessage();

    if (!costCheck.allowed) {
      this.logger.error(
        `❌ Message NOT sent due to cost limit | ${costCheck.reason}`,
      );
      // No enviamos el mensaje pero NO lanzamos error (el servicio se crea igual)
      return;
    }

    // Try Twilio first (more reliable)
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      this.logger.log('Using Twilio for WhatsApp notification');
      const success = await this.sendViaTwilio(data);
      if (success) {
        await this.costMonitor.recordMessageSent();
      }
      return;
    }

    // Fallback to CallMeBot (no cost tracking for free service)
    if (process.env.CALLMEBOT_API_KEY) {
      this.logger.log('Using CallMeBot for WhatsApp notification');
      await this.sendViaCallMeBot(data, adminPhone);
      return;
    }

    this.logger.warn(
      'No WhatsApp service configured. Set up either Twilio or CallMeBot credentials.',
    );
  }

  private async sendViaCallMeBot(
    data: {
      cliente: string;
      telefono: string;
      tipoElectrodomestico: string;
      problema: string;
      urgencia: string;
      ubicacionServicio?: string;
    },
    adminPhone: string,
  ): Promise<void> {
    try {
      const mensaje = this.formatMessage(data);
      const url = `https://api.callmebot.com/whatsapp.php`;

      const params = {
        phone: adminPhone,
        text: mensaje,
        apikey: process.env.CALLMEBOT_API_KEY || '',
      };

      await axios.get(url, { params });

      this.logger.log(`WhatsApp notification sent via CallMeBot for ${data.cliente}`);
    } catch (error) {
      this.logger.error('Error sending WhatsApp via CallMeBot', error.message);
      // Don't throw error so service creation doesn't fail
    }
  }

  private formatMessage(data: any): string {
    // Formato de fecha legible
    const now = new Date();
    const fechaHora = now.toLocaleString('es-MX', {
      timeZone: 'America/Mexico_City',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Encabezado con emoji de urgencia
    const urgenciaEmoji = data.urgencia?.toLowerCase() === 'alta' ? '🚨' :
                         data.urgencia?.toLowerCase() === 'media' ? '⚡' : '📌';

    let mensaje = `🔔 *Nueva Solicitud de Servicio - Techno Hogar*\n\n`;

    // Información básica del servicio
    if (data.servicioId) {
      mensaje += `📋 *Servicio #${data.servicioId}*\n`;
    }
    mensaje += `🕐 ${fechaHora}\n\n`;

    // Información del cliente
    mensaje += `👤 *CLIENTE*\n`;
    mensaje += `Nombre: ${data.cliente}\n`;
    mensaje += `📱 Tel: ${data.telefono}\n`;
    if (data.email) {
      mensaje += `📧 Email: ${data.email}\n`;
    }

    // Información del electrodoméstico
    mensaje += `\n🔧 *ELECTRODOMÉSTICO*\n`;
    mensaje += `Tipo: ${data.tipoElectrodomestico}\n`;
    if (data.marca) {
      mensaje += `Marca: ${data.marca}\n`;
    }
    if (data.modelo) {
      mensaje += `Modelo: ${data.modelo}\n`;
    }

    // Ubicación
    mensaje += `\n📍 *UBICACIÓN*\n`;
    if (data.direccion) {
      mensaje += `Dirección: ${data.direccion}\n`;
    }
    if (data.ubicacionServicio) {
      mensaje += `Ref: ${data.ubicacionServicio}\n`;
    }

    // Urgencia destacada
    mensaje += `\n${urgenciaEmoji} *URGENCIA: ${data.urgencia?.toUpperCase()}* ${urgenciaEmoji}\n`;

    // Fecha preferida
    if (data.fechaPreferida) {
      const fechaPref = new Date(data.fechaPreferida);
      const fechaFormateada = fechaPref.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      mensaje += `📅 Fecha preferida: ${fechaFormateada}\n`;
    }

    // Problema
    mensaje += `\n📝 *PROBLEMA:*\n`;
    mensaje += `${data.problema}\n`;

    // Call to action
    mensaje += `\n✅ Revisa el panel de administración para más detalles.`;

    return mensaje;
  }

  // Alternative method using Twilio (more robust but requires account)
  async sendViaTwilio(data: any): Promise<boolean> {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      this.logger.warn('Twilio credentials not configured');
      return false;
    }

    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioWhatsApp = process.env.TWILIO_WHATSAPP_NUMBER; // e.g.: whatsapp:+14155238886
      const adminWhatsApp = process.env.WHATSAPP_ADMIN_PHONE; // e.g.: whatsapp:+5218441234567

      const mensaje = this.formatMessage(data);

      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        new URLSearchParams({
          From: twilioWhatsApp,
          To: adminWhatsApp,
          Body: mensaje,
        }),
        {
          auth: {
            username: accountSid,
            password: authToken,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      this.logger.log('Message sent via Twilio:', response.data.sid);
      return true;
    } catch (error) {
      this.logger.error('Error sending message via Twilio');
      this.logger.error(error.message);
      if (error.response?.data) {
        this.logger.error('Twilio error details: ' + JSON.stringify(error.response.data));
      }
      return false;
    }
  }
}
