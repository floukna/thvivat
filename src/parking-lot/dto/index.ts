import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ParkingLotDto {
  @IsNumber()
  @IsNotEmpty()
  public free: number;

  @IsNumber()
  @IsNotEmpty()
  public pricePerHour: number;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public address: string;
}
