import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './healthModule/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RmqModule,
    HealthModule,
  ],
  controllers: [NotificationsController],
  providers: [],
})
export class NotificationsModule {}
