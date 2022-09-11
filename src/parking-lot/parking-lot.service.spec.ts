import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { ParkingLotService } from './parking-lot.service';

describe('ParkingLotService', () => {
  let service: ParkingLotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingLotService, PrismaService],
    }).compile();

    service = module.get<ParkingLotService>(ParkingLotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
