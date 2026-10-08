import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth, ApiParam } from '@nestjs/swagger';
import { GetUser } from '@common/decorators/get-user.decorator';
import { UsersService } from '../../users.service';
import { CreateUserDto } from '@modules/users/core/dto/create-user.dto';
import { UpdateUserDto } from '@modules/users/core/dto/update-user.dto';
import { ChangePositionDto } from '@modules/users/core/dto/change-position.dto';
import { ManagePermissionsDto } from '@modules/users/core/dto/manage-permissions.dto';
import { UserQueryDto } from '@modules/users/core/dto/user-query.dto';
import { UserEntity } from '../../core/entities/user.entity';
import { FavoriteSchoolResponseDto } from '../../core/dto/favorite-school-response.dto';
import { Permissions } from '@common/decorators/permissions.decorator';
import { PERMISSIONS } from '@common/constants/permissions.constant';
import {
  ApiSuccessResponse,
  ApiSuccessArrayResponse,
} from '@common/decorators/api-response.decorator';
import { PaginatedResponseDto } from '@common/dto/pagination.dto';
import { PermissionsGuard } from '@common/guards/permissions.guard';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Permissions(PERMISSIONS.USER.ADD)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiSuccessResponse(UserEntity)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Permissions(PERMISSIONS.USER.VIEW)
  @ApiOperation({ summary: 'Get all users with pagination and filters' })
  @ApiSuccessResponse(PaginatedResponseDto<UserEntity>)
  async findAll(@Query() query: UserQueryDto): Promise<PaginatedResponseDto<UserEntity>> {
    return this.usersService.findAll(query);
  }

  @Get('favorite-schools')
  @Permissions(PERMISSIONS.USER.MANAGE_FAVORITE_SCHOOLS)
  @ApiOperation({ summary: 'Get all favorited schools' })
  @ApiSuccessArrayResponse(FavoriteSchoolResponseDto, {
    statusCode: 200,
    message: 'Data retrieved successfully',
    data: [
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        user_id: '550e8400-e29b-41d4-a716-446655440004',
        school_id: '550e8400-e29b-41d4-a716-446655440001',
        created_at: '2026-10-08T03:15:00.000Z',
        school: {
          id: '550e8400-e29b-41d4-a716-446655440001',
          npsn: '20202020',
          name: 'SMA Negeri 1 Bandung',
          level: 'SMA',
          status: 'Negeri',
          address: 'Jl. Ir. H. Juanda No. 93, Bandung',
          kelurahan: 'Lebakgede',
          kecamatan: 'Coblong',
          featureId: '550e8400-e29b-41d4-a716-446655440002',
          created_at: '2026-10-08T03:00:00.000Z',
          updated_at: '2026-10-08T03:00:00.000Z',
          deleted_at: null,
        },
      },
    ],
    errors: null,
  })
  async getFavoritedSchools(
    @GetUser('userId') userId: string,
  ): Promise<FavoriteSchoolResponseDto[]> {
    return this.usersService.getFavoriteSchools(userId);
  }

  @Post('favorite-schools/:schoolId')
  @Permissions(PERMISSIONS.USER.MANAGE_FAVORITE_SCHOOLS)
  @ApiOperation({ summary: 'Add a school to user favorites' })
  @ApiParam({ name: 'schoolId', type: String, format: 'uuid' })
  @ApiSuccessResponse(UserEntity)
  async addFavoriteSchool(
    @Param('schoolId', ParseUUIDPipe) schoolId: string,
    @GetUser('userId') userId: string,
  ): Promise<UserEntity> {
    return this.usersService.addFavoriteSchool(userId, schoolId);
  }



  @Get(':id')
  @Permissions(PERMISSIONS.USER.VIEW)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiSuccessResponse(UserEntity)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Permissions(PERMISSIONS.USER.UPDATE)
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiSuccessResponse(UserEntity)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Permissions(PERMISSIONS.USER.DELETE)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user (soft delete)' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Patch(':id/position')
  @Permissions(PERMISSIONS.USER.CHANGE_POSITION)
  @ApiOperation({ summary: 'Change user position/role' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiSuccessResponse(UserEntity)
  async changePosition(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changePositionDto: ChangePositionDto,
  ): Promise<UserEntity> {
    return this.usersService.changePosition(id, changePositionDto);
  }

  @Post(':id/permissions/assign')
  @Permissions(PERMISSIONS.USER.MANAGE_PERMISSION)
  @ApiOperation({ summary: 'Assign permissions to user position' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiSuccessResponse(UserEntity)
  async assignPermissions(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() managePermissionsDto: ManagePermissionsDto,
  ): Promise<UserEntity> {
    return this.usersService.assignPermissions(id, managePermissionsDto);
  }

  @Post(':id/permissions/revoke')
  @Permissions(PERMISSIONS.USER.MANAGE_PERMISSION)
  @ApiOperation({ summary: 'Revoke permissions from user position' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiSuccessResponse(UserEntity)
  async revokePermissions(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() managePermissionsDto: ManagePermissionsDto,
  ): Promise<UserEntity> {
    return this.usersService.revokePermissions(id, managePermissionsDto);
  }
}
