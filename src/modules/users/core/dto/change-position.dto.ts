import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ChangePositionDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'New position UUID',
  })
  @IsUUID('4', { message: 'Position ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Position ID is required' })
  position_id: string;
}
