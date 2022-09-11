import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Tickets } from '@prisma/client';
import { CarSizeDto, TicketsDto } from './dto';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

const MOCK_GET_REGISTRATION_NUMBER_RESPONSE = [
  {
    plateNumber: 'A2',
  },
  {
    plateNumber: 'A3',
  },
];

const MOCK_GET_SLOT_NUMBER_RESPONSE = [
  {
    parkingSlots: {
      slotNumber: 'A1',
    },
  },
];

const MOCK_CREATE_TICKET_RESPONSE: Tickets = {
  id: 3,
  entryTime: new Date(),
  exitTime: null,
  plateNumber: 'AC-2',
  isPaid: false,
  carSize: 'large',
  parkingSlotsId: 3,
  parkingLotId: 1,
};

describe('TicketsController', () => {
  let controller: TicketsController;
  let mockTicketsService: Partial<TicketsService>;

  beforeEach(async () => {
    mockTicketsService = {
      getRegistrationNumberByCarSize: () => Promise.resolve(null),
      getSlotNumberByCarSize: () => Promise.resolve(null),
      createTicket: () => Promise.resolve(null),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [
        {
          provide: TicketsService,
          useValue: mockTicketsService,
        },
      ],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRegistrationNumberByCarSize', () => {
    const target: ValidationPipe = new ValidationPipe();
    const metadata: ArgumentMetadata = {
      type: 'param',
      metatype: CarSizeDto,
      data: null,
    };
    const params: CarSizeDto = { carSize: 'small' };
    test('when param carSize not equal enum, expect error message', async () => {
      await target
        .transform(<any>{ carSize: 'smallll' }, metadata)
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err.getResponse().message).toEqual([
            'carSize must be a valid enum value',
          ]);
        });
    });
    it('should provide us with api to get registration plate number list by car size', async () => {
      jest
        .spyOn(mockTicketsService, 'getRegistrationNumberByCarSize')
        .mockImplementation(async () => {
          return MOCK_GET_REGISTRATION_NUMBER_RESPONSE;
        });
      await target.transform(<CarSizeDto>params, metadata).then(async () => {
        const get = await controller.getRegistrationNumberByCarSize(params);
        expect(get).toHaveLength(2);
        expect(get).toEqual(MOCK_GET_REGISTRATION_NUMBER_RESPONSE);
      });
    });
  });

  describe('getSlotNumberByCarSize', () => {
    const target: ValidationPipe = new ValidationPipe();
    const metadata: ArgumentMetadata = {
      type: 'param',
      metatype: CarSizeDto,
      data: null,
    };
    const params: CarSizeDto = { carSize: 'small' };
    it('should provide us with api to get registration plate number list by car size', async () => {
      jest
        .spyOn(mockTicketsService, 'getSlotNumberByCarSize')
        .mockImplementation(async () => {
          return MOCK_GET_SLOT_NUMBER_RESPONSE;
        });
      await target.transform(<CarSizeDto>params, metadata).then(async () => {
        const get = await controller.getSlotNumberByCarSize(params);
        expect(get).toHaveLength(1);
        expect(get).toEqual(MOCK_GET_SLOT_NUMBER_RESPONSE);
      });
    });
  });

  describe('createTicket', () => {
    const target: ValidationPipe = new ValidationPipe();
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: TicketsDto,
      data: null,
    };
    it('when body not equal dto, expect error message', async () => {
      await target
        .transform(
          <any>{
            parkingLotId: 1,
            plateNumber: 12321,
            carSize: 'largeee',
          },
          metadata,
        )
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err.getResponse().message).toEqual([
            'plateNumber must be a string',
            'carSize must be a valid enum value',
          ]);
        });
    });
    it('should provide us with api to park the car', async () => {
      const createDTO: TicketsDto = {
        parkingLotId: 1,
        plateNumber: 'AB-1',
        carSize: 'large',
      };
      jest
        .spyOn(mockTicketsService, 'createTicket')
        .mockImplementation(async () => {
          return MOCK_CREATE_TICKET_RESPONSE;
        });
      await target
        .transform(
          <TicketsDto>createDTO,
          metadata,
        )
        .then(async () => {
          const created = await controller.createTicket(createDTO);
          expect(created).toEqual(MOCK_CREATE_TICKET_RESPONSE);
        });
    });
  });

  describe('leaveSlot', () => {});
});
