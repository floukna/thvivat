import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSlotsService } from '../parking-slots/parking-slots.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TicketsService } from './tickets.service';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsService, PrismaService, ParkingSlotsService],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
