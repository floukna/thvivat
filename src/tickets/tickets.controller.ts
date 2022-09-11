import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CarSizeDto, TicketsDto } from './dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('plate-numbers/:carSize')
  async getRegistrationNumberByCarSize(@Param() params: CarSizeDto) {
    return this.ticketsService.getRegistrationNumberByCarSize(params.carSize)
  }

  @Get('slot-numbers/:carSize')
  async getSlotNumberByCarSize(@Param() params: CarSizeDto) {
    return this.ticketsService.getSlotNumberByCarSize(params.carSize)
  }

  @Post()
  async createTicket(@Body() body: TicketsDto) {
    return this.ticketsService.createTicket(body);
  }

  @Patch('leave-slot/:id')
  async leaveSlot(@Param() params: { id: string }) {
    const { id } = params;
    return this.ticketsService.leaveSlot(+id);
  }
}
