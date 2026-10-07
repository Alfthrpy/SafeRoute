import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RoutesService } from '../../routes.service';
import { PERMISSIONS } from '@common/constants/permissions.constant';
import { Permissions } from '@common/decorators/permissions.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { PermissionsGuard } from '@common/guards/permissions.guard';
import { FindRouteDto } from '@modules/routes/core/dto/find-route-query.dto';
import { RouteResponseDto } from '@modules/routes/core/interfaces/route-response.interface';

@ApiTags('Routes')
@Controller({ path: 'routes', version: '1' })
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  @Permissions(PERMISSIONS.ROUTE.VIEW)
  @ApiOperation({ summary: 'Get the route' })
  findAll(@Query() query: FindRouteDto): Promise<RouteResponseDto> {
    return this.routesService.findRoute(query);
  }
}
