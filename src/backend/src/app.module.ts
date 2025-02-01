import { Module } from '@nestjs/common';
import { PaymentsModule } from './shared/payments/payments.module';
import { NotificationsModule } from './shared/notifications/notifications.module';

@Module({
  imports: [PaymentsModule, NotificationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
