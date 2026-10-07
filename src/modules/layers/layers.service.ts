import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLayerDto } from './core/dto/create-layer.dto';
import { UpdateLayerDto } from './core/dto/update-layer.dto';
import { PrismaService } from '@common/prisma/prisma.service';
import { LayerEntity } from './core/entities/layer.entity'
import { Prisma } from '@prisma/client';

@Injectable()
export class LayersService {
  constructor(private prisma: PrismaService) {}

  async create(createLayerDto: CreateLayerDto) {
    const { name, code, geomType } = createLayerDto;
    const existCode = await this.prisma.layer.findUnique({
      where: { code },
    })

    if(existCode){
      throw new BadRequestException('Layer code already exists');
    }

    const data = await this.prisma.layer.create({
      data: {
        name,
        code,
        geometryType: geomType,
      },
    })
    return data
  }

  async findAll() : Promise<LayerEntity[]> {
    return await this.prisma.layer.findMany({
      where: {
        deleted_at: null,
      }
    })
  }

  async findOne(id: string) : Promise<LayerEntity> {
    const data = await this.prisma.layer.findUnique({
      where: { id, deleted_at: null },
    })
    return data
  }

  async update(id: string, updateLayerDto: UpdateLayerDto):Promise<LayerEntity> {
    const { name, code, geomType } = updateLayerDto;
    const existCode = await this.prisma.layer.findUnique({
      where: { code },
    })
    if(existCode){
      throw new BadRequestException('Layer code already exists');
    }

    const data = await this.prisma.layer.update({
      where: { id },
      data: {
        name,
        code,
        geometryType: geomType,
      },
    })

    return data
  }

  async remove(id: string): Promise<void> {
    const layer = await this.prisma.layer.findUnique({ where: { id, deleted_at: null } });
    if (!layer) {
      throw new NotFoundException('Layer not found');
    }

    await this.prisma.layer.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    await this.prisma.$executeRaw(
      Prisma.sql`
        UPDATE "features"
        SET "deleted_at" = NOW(), "updated_at" = NOW()
        WHERE "layer_id" = ${id} AND "deleted_at" IS NULL
      `,
    );
  }
}
