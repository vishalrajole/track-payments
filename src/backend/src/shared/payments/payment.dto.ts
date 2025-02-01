import { ApiProperty } from '@nestjs/swagger';

export type PaymentStatus = 'completed' | 'failed' | 'processing';

export class Payment {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  reference: string;

  @ApiProperty()
  amount: string;

  @ApiProperty()
  status: PaymentStatus;

  @ApiProperty()
  createdAt: Date;
}
