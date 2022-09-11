import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ParkingLotDto } from './dto';
import { ParkingLotService } from './parking-lot.service';

@Controller('parking-lot')
export class ParkingLotController {
  constructor(private readonly parkingLot: ParkingLotService) {}

  @Post()
  async createParkingLot(@Body() body: ParkingLotDto) {
    return this.parkingLot.createParkingLot(body);
  }

  @Get()
  async findAll() {
    return this.parkingLot.findAll();
  }

  @Get('status/:id')
  async getStatusParkingLot(@Param() params: { id: number }) {
    const { id } = params;
    return this.parkingLot.getStatusParkingLot(+id);
  }
}
