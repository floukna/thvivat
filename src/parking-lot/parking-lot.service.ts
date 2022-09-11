import { Injectable, NotFoundException } from '@nestjs/common';
import { ParkingLot, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ParkingLotService {
  constructor(private prisma: PrismaService) {}

  async createParkingLot(data: Prisma.ParkingLotCreateInput): Promise<ParkingLot> {
    return this.prisma.parkingLot.create({
      data: {
        name: data.name,
        address: data.address,
        free: data.free,
        pricePerHour: data.pricePerHour,
        isSlotAvailable: true,
        floors: {
          create: [
            {
              floorNumber: 1,
              parkingSlots: {
                create: [
                  {
                    slotNumber: 'A1',
                    isPark: false,
                  },
                  {
                    slotNumber: 'A2',
                    isPark: false,
                  },
                  {
                    slotNumber: 'A3',
                    isPark: false,
                  },
                ],
              },
            },
            {
              floorNumber: 2,
              parkingSlots: {
                create: [
                  {
                    slotNumber: 'B1',
                    isPark: false,
                  },
                  {
                    slotNumber: 'B2',
                    isPark: false,
                  },
                  {
                    slotNumber: 'B3',
                    isPark: false,
                  },
                ],
              },
            },
          ],
        },
      },
    });
  }

  async findAll() {
    return this.prisma.parkingLot.findMany();
  }

  async getStatusParkingLot(id: number): Promise<string> {
    const parkingLot = await this.prisma.parkingLot.findFirst({
      where: {
        id,
      },
    });
    if (parkingLot) {
      if (parkingLot.isSlotAvailable) {
        return 'Not full';
      }
      return 'Full';
    }
    throw new NotFoundException();
  }
}
