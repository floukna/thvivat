import { BadRequestException, Injectable } from '@nestjs/common';
import { carSizeType, Tickets } from '@prisma/client';
import { ParkingSlotsService } from '../parking-slots/parking-slots.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TicketsDto } from './dto';

@Injectable()
export class TicketsService {
  constructor(
    private prisma: PrismaService,
    private parkingSlotsService: ParkingSlotsService,
  ) {}

  async leaveSlot(id: number): Promise<Tickets> {
    return this.prisma.tickets.update({
      where: {
        id,
      },
      data: {
        isPaid: true,
        exitTime: new Date(),
        parkingSlots: {
          update: {
            isPark: false,
          },
        },
        parkingLot: {
          update: {
            isSlotAvailable: true,
          },
        },
      },
    });
  }

  async createTicket(data: TicketsDto): Promise<Tickets> {
    const checkParkingAvailbale = await this.prisma.parkingLot.findFirst({
      where: {
        id: data.parkingLotId,
        isSlotAvailable: true,
      },
    });
    if (!checkParkingAvailbale) {
      throw new BadRequestException('Parking lot full!!');
    }
    const ticket = await this.prisma.tickets.findFirst({
      where: {
        plateNumber: data.plateNumber,
        isPaid: false,
      },
    });
    if (ticket) {
      throw new BadRequestException('Please leave the parking lot');
    }
    const parkingSlot = await this.parkingSlotsService.findParkingNearEntry(
      data.parkingLotId,
    );
    const created = await this.prisma.tickets.create({
      data: {
        plateNumber: data.plateNumber,
        carSize: data.carSize,
        entryTime: new Date(),
        parkingSlotsId: parkingSlot.id,
        parkingLotId: data.parkingLotId,
        isPaid: false,
      },
    });
    if (created) {
      await this.prisma.parkingSlots.update({
        where: {
          id: parkingSlot.id,
        },
        data: {
          isPark: true,
        },
      });
      const remainParkingSlot = await this.prisma.parkingSlots.count({
        where: {
          isPark: false,
          floors: {
            parkingLot: {
              id: data.parkingLotId,
            },
          },
        },
      });
      if (remainParkingSlot === 0) {
        await this.prisma.parkingLot.update({
          where: {
            id: data.parkingLotId,
          },
          data: {
            isSlotAvailable: false,
          },
        });
      }
    }
    return created;
  }

  async getRegistrationNumberByCarSize(carSize: carSizeType) {
    return this.prisma.tickets.findMany({
      select: {
        plateNumber: true,
      },
      where: {
        carSize,
      },
    });
  }

  async getSlotNumberByCarSize(carSize: carSizeType) {
    return this.prisma.tickets.findMany({
      select: {
        parkingSlots: {
          select: {
            slotNumber: true,
          },
        },
      },
      where: {
        carSize,
      },
    });
  }
}
