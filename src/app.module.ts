import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingLotModule } from './parking-lot/parking-lot.module';
import { TicketsModule } from './tickets/tickets.module';
import { ParkingSlotsModule } from './parking-slots/parking-slots.module';

@Module({
  imports: [PrismaModule, ParkingLotModule, TicketsModule, ParkingSlotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
