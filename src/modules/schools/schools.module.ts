import { Module } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './controllers/v1/schools.controller';

@Module({
  controllers: [SchoolsController],
  providers: [SchoolsService],
})
export class SchoolsModule {}
