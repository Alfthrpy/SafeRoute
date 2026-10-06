import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '@common/decorators/public.decorator';

interface HealthResponse {
  status: 'ok';
  timestamp: string;
  uptime: number;
  environment: string | undefined;
}

interface PingResponse {
  message: 'pong';
  timestamp: string;
}

@ApiTags('Health')
@Controller()
export class HealthController {
  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  health(): HealthResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    };
  }

  @Public()
  @Get('ping')
  @ApiOperation({ summary: 'Ping endpoint' })
  ping(): PingResponse {
    return {
      message: 'pong',
      timestamp: new Date().toISOString(),
    };
  }
}
