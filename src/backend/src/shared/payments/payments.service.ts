import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Payment } from './payment.dto';

@Injectable()
export class PaymentsService {
  private generatePayments(count: number): Payment[] {
    return Array.from({ length: count }).map((_, index) => ({
      id: faker.string.ulid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      reference: faker.lorem.word(),
      amount: faker.finance.amount(),
      status: faker.helpers.shuffle<Payment['status']>([
        'completed',
        'failed',
        'processing',
      ])[0]!,
      createdAt: faker.date.anytime(),
    }));
  }

  async fetchPaymentsData({
    start,
    limit,
    sorting,
    searchTerm,
  }: {
    start: number;
    limit: number;
    sorting: { id: keyof Payment; desc: boolean }[];
    searchTerm?: string;
  }) {
    let dbData = this.generatePayments(1000);

    if (sorting?.length) {
      const { id, desc } = sorting[0];
      dbData.sort((a, b) => {
        if (desc) {
          return a[id] < b[id] ? 1 : -1;
        }
        return a[id] > b[id] ? 1 : -1;
      });
    }

    if (searchTerm?.length) {
      dbData = dbData.filter((payment) =>
        Object.values(payment).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 200));

    return {
      data: dbData.slice(start, start + limit),
      meta: {
        totalRowCount: dbData.length,
      },
    };
  }
}
