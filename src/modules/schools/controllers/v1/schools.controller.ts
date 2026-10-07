import { Permissions } from '@common/decorators/permissions.decorator';
import { ApiSuccessResponse } from '@common/decorators/api-response.decorator';
import { PaginatedResponseDto } from '@common/dto/pagination.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { PermissionsGuard } from '@common/guards/permissions.guard';
import { CreateSchoolDto } from '@modules/schools/core/dto/create-school.dto';
import { SchoolQueryDto } from '@modules/schools/core/dto/school-query.dto';
import { UpdateSchoolDto } from '@modules/schools/core/dto/update-school.dto';
import { SchoolEntity } from '@modules/schools/core/entities/school.entity';
import { SchoolsService } from '@modules/schools/schools.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PERMISSIONS } from '@common/constants/permissions.constant';


@ApiTags('Schools')
@Controller({ path: 'schools', version: '1' })
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class SchoolsController {  
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolsService.create(createSchoolDto);
  }

  @Get()
  @Permissions(PERMISSIONS.SCHOOL.VIEW)
  @ApiOperation({ summary: 'Get all schools with pagination and filters' })
  @ApiSuccessResponse(PaginatedResponseDto<SchoolEntity>)
  findAll(@Query() query: SchoolQueryDto): Promise<PaginatedResponseDto<SchoolEntity>> {
    return this.schoolsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolsService.update(+id, updateSchoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolsService.remove(+id);
  }
}
