import { ApiProperty } from '@nestjs/swagger';

export class Notification {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  createdAt: Date;
}
