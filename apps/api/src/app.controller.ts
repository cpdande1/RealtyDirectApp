import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth(): Promise<{ status: string; timestamp: string; uptime: number; database?: string }> {
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };

    // Try to check database connection
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { ...health, database: 'connected' };
    } catch (error) {
      return { ...health, database: 'disconnected' };
    }
  }

}
