import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SchoolEntity {
    @ApiProperty()
    id: string;

    @ApiPropertyOptional()
    npsn? : string;

    @ApiProperty()
    name: string;

    @ApiPropertyOptional()
    level?: string;

    @ApiPropertyOptional()
    status?: string;

    @ApiPropertyOptional()
    address?: string;

    @ApiPropertyOptional()
    kelurahan?: string;

    @ApiPropertyOptional()
    kecamatan?: string;

    @ApiProperty()
    featureId: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiPropertyOptional()
    deleted_at?: Date;

    @ApiProperty({ type: Object })
    feature: {
        id: string;
        layerId: string;
        geom: Record<string, unknown>;
        sourceId: string | null;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    };

    constructor(partial: Partial<SchoolEntity>) {
        Object.assign(this, partial);
    }
}
