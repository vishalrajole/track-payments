import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Notification } from './notifications.dto';

@Injectable()
export class NotificationsService {
  private generateNotifications(count: number): Notification[] {
    return Array.from({ length: count }).map((_, index) => ({
      id: faker.string.ulid(),
      title: faker.lorem.words(),
      message: faker.lorem.sentence(),
      createdAt: faker.date.anytime(),
    }));
  }

  async fetchNotificationsData({
    start,
    limit,
  }: {
    start: number;
    limit: number;
  }) {
    const dbData = this.generateNotifications(1000);

    await new Promise((resolve) => setTimeout(resolve, 200));

    return {
      data: dbData.slice(start, start + limit),
      meta: {
        totalRowCount: dbData.length,
      },
    };
  }
}
