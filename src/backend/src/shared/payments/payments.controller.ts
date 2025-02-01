import { Controller, Get, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  async getPayments(
    @Query('start') start: number,
    @Query('limit') limit: number,
    @Query('sorting') sorting: string,
    @Query('searchTerm') searchTerm?: string,
  ) {
    const parsedSorting = sorting ? JSON.parse(sorting) : [];
    return this.paymentsService.fetchPaymentsData({
      start: +start,
      limit: +limit,
      sorting: parsedSorting,
      searchTerm,
    });
  }
}
