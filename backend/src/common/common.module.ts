import { Module, Global } from '@nestjs/common';
import { GoogleSheetsService } from './services/google-sheets.service';
import { WhatsAppService } from './services/whatsapp.service';
import { NotificationListener } from './listeners/notification.listener';

@Global()
@Module({
  providers: [GoogleSheetsService, WhatsAppService, NotificationListener],
  exports: [GoogleSheetsService, WhatsAppService],
})
export class CommonModule {}
