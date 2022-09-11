import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ParkingSlotsService {
  constructor(private prisma: PrismaService) {}

  async findParkingNearEntry(parkingLotId: number) {
    return this.prisma.parkingSlots.findFirst({
      where: {
        isPark: false,
        floors: {
          parkingLotId,
        },
      },
      orderBy: { slotNumber: 'asc' },
    });
  }
}
