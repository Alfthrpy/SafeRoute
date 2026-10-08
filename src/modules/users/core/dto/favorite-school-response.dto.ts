import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FavoriteSchoolDetailsDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
  id: string;

  @ApiPropertyOptional({ example: '20202020' })
  npsn: string | null;

  @ApiProperty({ example: 'SMA Negeri 1 Bandung' })
  name: string;

  @ApiPropertyOptional({ example: 'SMA' })
  level: string | null;

  @ApiPropertyOptional({ example: 'Negeri' })
  status: string | null;

  @ApiPropertyOptional({ example: 'Jl. Ir. H. Juanda No. 93, Bandung' })
  address: string | null;

  @ApiPropertyOptional({ example: 'Lebakgede' })
  kelurahan: string | null;

  @ApiPropertyOptional({ example: 'Coblong' })
  kecamatan: string | null;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440002' })
  featureId: string;

  @ApiProperty({ example: '2026-10-08T03:00:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2026-10-08T03:00:00.000Z' })
  updated_at: Date;

  @ApiPropertyOptional({ example: null, nullable: true })
  deleted_at: Date | null;
}

export class FavoriteSchoolResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440003' })
  id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440004' })
  user_id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
  school_id: string;

  @ApiProperty({ example: '2026-10-08T03:15:00.000Z' })
  created_at: Date;

  @ApiProperty({ type: () => FavoriteSchoolDetailsDto })
  school: FavoriteSchoolDetailsDto;
}
