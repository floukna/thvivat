import { Module } from '@nestjs/common';
import { ParkingSlotsModule } from 'src/parking-slots/parking-slots.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  imports: [PrismaModule, ParkingSlotsModule],
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}
