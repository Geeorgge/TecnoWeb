import { Module, Global } from '@nestjs/common';
import { GoogleSheetsService } from './services/google-sheets.service';
import { WhatsAppService } from './services/whatsapp.service';
import { CostMonitorService } from './services/cost-monitor.service';
import { NotificationListener } from './listeners/notification.listener';

@Global()
@Module({
  providers: [
    GoogleSheetsService,
    WhatsAppService,
    CostMonitorService,
    NotificationListener,
  ],
  exports: [GoogleSheetsService, WhatsAppService, CostMonitorService],
})
export class CommonModule {}
