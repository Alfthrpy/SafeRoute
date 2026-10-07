import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './controllers/v1/routes.controller';

@Module({
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
