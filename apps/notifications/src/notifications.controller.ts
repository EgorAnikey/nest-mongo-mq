import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  protected readonly logger = new Logger(NotificationsController.name);

  constructor() {}

  @EventPattern('user_created')
  userCreated(@Payload() data: any) {
    this.logger.log('User created:', data);
  }

  @EventPattern('user_deleted')
  async userDeleted(@Payload() data: any) {
    this.logger.log('User deleted:', data);
  }
}
