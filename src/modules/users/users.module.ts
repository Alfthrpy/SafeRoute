import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './controllers/v1/users.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
