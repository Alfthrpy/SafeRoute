import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLayerDto {
    
    @ApiProperty({ description: 'The name of the layer' })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({description: 'The code of the layer'})
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ description: 'GeomType of the layer' })
    @IsString()
    @IsNotEmpty()
    geomType: string;



}
