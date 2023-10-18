import { Controller, Get, Logger } from '@nestjs/common';
import { HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  protected readonly logger = new Logger(HealthController.name);

  constructor(
    private health: HealthCheckService,
    private db: MongooseHealthIndicator,
  ) {}

  @Get()
  async check() {
    this.logger.log('Health check');

    return this.health.check([() => this.db.pingCheck('mongoose')]);
  }
}
