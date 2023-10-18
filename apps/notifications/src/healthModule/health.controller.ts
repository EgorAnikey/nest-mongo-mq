import { Controller, Get, Logger } from '@nestjs/common';
import { HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  protected readonly logger = new Logger(HealthController.name);

  constructor(private health: HealthCheckService) {}

  @Get()
  async check() {
    this.logger.log('Health check');

    return this.health.check([]);
  }
}
