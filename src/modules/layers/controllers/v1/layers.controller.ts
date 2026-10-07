import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LayersService } from '../../layers.service';
import { CreateLayerDto } from '../../core/dto/create-layer.dto';
import { UpdateLayerDto } from '../../core/dto/update-layer.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { PermissionsGuard } from '@common/guards/permissions.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PERMISSIONS } from '@common/constants/permissions.constant';
import { ApiSuccessResponse } from '@common/decorators/api-response.decorator';
import { LayerEntity } from '@modules/layers/core/entities/layer.entity';
import { Permissions } from '@common/decorators/permissions.decorator';

@ApiTags('Layers')
@Controller({ path: 'layers', version: '1' })
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class LayersController {
  constructor(private readonly layersService: LayersService) {}

  @Post()
  @Permissions(PERMISSIONS.LAYER.ADD)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiSuccessResponse(LayerEntity)
  create(@Body() createLayerDto: CreateLayerDto) {
    return this.layersService.create(createLayerDto);
  }

  @Get()
  @Permissions(PERMISSIONS.LAYER.VIEW)
  @ApiOperation({ summary: 'Get all layers' })
  @ApiSuccessResponse(LayerEntity)
  findAll() {
    return this.layersService.findAll();
  }

  @Get(':id')
  @Permissions(PERMISSIONS.LAYER.VIEW)
  @ApiOperation({ summary: 'Get layer by ID' })
  @ApiSuccessResponse(LayerEntity)
  findOne(@Param('id') id: string) {
    return this.layersService.findOne(id);
  }

  @Patch(':id')
  @Permissions(PERMISSIONS.LAYER.UPDATE)
  @ApiOperation({ summary: 'Update layer by ID' })
  @ApiSuccessResponse(LayerEntity)
  update(@Param('id') id: string, @Body() updateLayerDto: UpdateLayerDto) {
    return this.layersService.update(id, updateLayerDto);
  }

  @Delete(':id')
  @Permissions(PERMISSIONS.LAYER.DELETE)
  @ApiOperation({ summary: 'Delete layer by ID' })
  @ApiSuccessResponse(LayerEntity)
  remove(@Param('id') id: string) {
    return this.layersService.remove(id);
  }
}
