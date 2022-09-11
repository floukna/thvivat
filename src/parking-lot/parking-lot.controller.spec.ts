import {
  ArgumentMetadata,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ParkingLotDto } from './dto';
import { ParkingLotController } from './parking-lot.controller';
import { ParkingLotService } from './parking-lot.service';

const MOCK_CREATE_PARKING_LOT = {
  name: 'test',
  address: 'test',
  free: 0,
  pricePerHour: 0,
};

const MOCK_CREATE_PARKING_LOT_RESPONSE = {
  id: 1,
  isSlotAvailable: true,
  ...MOCK_CREATE_PARKING_LOT,
};

describe('ParkingLotController', () => {
  let controller: ParkingLotController;
  let mockParkingLotService: Partial<ParkingLotService>;

  beforeEach(async () => {
    mockParkingLotService = {
      createParkingLot: () => Promise.resolve(null),
      findAll: () => Promise.resolve([MOCK_CREATE_PARKING_LOT_RESPONSE]),
      getStatusParkingLot: () => Promise.resolve(null),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingLotController],
      providers: [
        {
          provide: ParkingLotService,
          useValue: mockParkingLotService,
        },
      ],
    }).compile();

    controller = module.get<ParkingLotController>(ParkingLotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createParkingLot', () => {
    const target: ValidationPipe = new ValidationPipe();
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: ParkingLotDto,
      data: null,
    };
    test('when body name and address are empty string, expect error message', async () => {
      await target
        .transform(
          <ParkingLotDto>{ ...MOCK_CREATE_PARKING_LOT, name: '', address: '' },
          metadata,
        )
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err.getResponse().message).toEqual([
            'name should not be empty',
            'address should not be empty',
          ]);
        });
    });
    test('when body pricePerHour and free are string, expect error message', async () => {
      await target
        .transform(
          <any>{ ...MOCK_CREATE_PARKING_LOT, free: '1', pricePerHour: '1' },
          metadata,
        )
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err.getResponse().message).toEqual([
            'free must be a number conforming to the specified constraints',
            'pricePerHour must be a number conforming to the specified constraints',
          ]);
        });
    });
    it('should provide us with api to create parking lot', async () => {
      jest
        .spyOn(mockParkingLotService, 'createParkingLot')
        .mockImplementation(async () => {
          return MOCK_CREATE_PARKING_LOT_RESPONSE;
        });
      await target
        .transform(<ParkingLotDto>{ ...MOCK_CREATE_PARKING_LOT }, metadata)
        .then(async () => {
          const created = await controller.createParkingLot(
            MOCK_CREATE_PARKING_LOT,
          );
          expect(created).toEqual(MOCK_CREATE_PARKING_LOT_RESPONSE);
        });
    });
  });
  describe('findAll', () => {
    it('should find all parking lots', async () => {
      const findAll = await controller.findAll();
      expect(findAll).toHaveLength(1);
      expect(findAll).toEqual([MOCK_CREATE_PARKING_LOT_RESPONSE]);
    });
  });
  describe('getStatusParkingLot', () => {
    describe('should provide us with api to get status of parking lot', () => {
      it('should throw NotFoundException, when throw error', async () => {
        jest
          .spyOn(mockParkingLotService, 'getStatusParkingLot')
          .mockImplementation(() => {
            throw new NotFoundException();
          });
        try {
        } catch (err) {
          expect(err.status).toEqual(404)
        }
      });
      it('should get status parking lot is Full, when return Full', async () => {
        jest
          .spyOn(mockParkingLotService, 'getStatusParkingLot')
          .mockImplementation(async () => 'Full');
        const getStatus = await controller.getStatusParkingLot({ id: 1 });
        expect(getStatus).toEqual('Full');
      });
      it('should get status parking lot is Not full, when return Not full', async () => {
        jest
          .spyOn(mockParkingLotService, 'getStatusParkingLot')
          .mockImplementation(async () => 'Not full');
        const getStatus = await controller.getStatusParkingLot({ id: 1 });
        expect(getStatus).toEqual('Not full');
      });
    });
  });
});
