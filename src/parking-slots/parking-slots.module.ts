import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ParkingSlotsService } from './parking-slots.service';

@Module({
  imports: [PrismaModule],
  providers: [ParkingSlotsService],
  exports: [ParkingSlotsService]
})
export class ParkingSlotsModule {}
