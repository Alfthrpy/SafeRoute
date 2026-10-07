
import {Layer as PrismaLayer, Feature, Prisma} from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LayerEntity implements Partial <PrismaLayer> {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    code: string;

    @ApiProperty()
    geometryType: string;

    @ApiPropertyOptional()
    feature?: Feature[];
    

    constructor(partial: Partial<LayerEntity>) {
        Object.assign(this, partial);
    }
}

