import { PaginationDto } from "@common/dto/pagination.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class SchoolQueryDto extends PaginationDto {
    @ApiPropertyOptional({example: 'SMAK DAGO'})
    @IsOptional()
    @IsString()
    search?: string;

}
