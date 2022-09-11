import { carSizeType } from '@prisma/client';
import {
  IsEnum, IsNotEmpty, IsNumber, IsString,
} from 'class-validator';

export class CarSizeDto {
  @IsEnum(carSizeType)
  carSize: carSizeType;
}

export class TicketsDto {
  @IsNumber()
  @IsNotEmpty()
  parkingLotId: number

  @IsString()
  @IsNotEmpty()
  public plateNumber: string;


  @IsEnum(carSizeType)
  @IsNotEmpty()
  carSize: carSizeType;
}