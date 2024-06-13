import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class UpdateProductDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  quantity: number;
}
