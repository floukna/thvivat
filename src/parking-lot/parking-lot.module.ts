import { Module } from '@nestjs/common';
import { ParkingLotService } from './parking-lot.service';
import { ParkingLotController } from './parking-lot.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ParkingLotService],
  controllers: [ParkingLotController]
})
export class ParkingLotModule {}
