import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max, IsUUID, IsIn } from 'class-validator';
import { RouteProfile } from '../interfaces/route-response.interface';

export class FindRouteDto {
  @ApiProperty({ example: 107.6098, minimum: 107.4, maximum: 107.9 })
  @IsNumber()
  @Min(107.4)
  @Max(107.9)
  fromLon: number;

  @ApiProperty({ example: -6.9147, minimum: -7.1, maximum: -6.8 })
  @IsNumber()
  @Min(-7.1)
  @Max(-6.8)
  fromLat: number;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  schoolId: string;

  @ApiProperty({ enum: ['fast', 'safe', 'balanced'] })
  @IsIn(['fast', 'safe', 'balanced'])
  profile: RouteProfile;
}