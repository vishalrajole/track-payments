import { Controller, Get, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getNotifications(
    @Query('start') start: number,
    @Query('limit') limit: number,
  ) {
    return this.notificationsService.fetchNotificationsData({
      start: +start,
      limit: +limit,
    });
  }
}
