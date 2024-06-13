import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  customer_cep: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  quantity: number;
}
