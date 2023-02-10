import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { multiply, sum } from '@acme-corp/math';

@Controller()
export class MathController {
  @MessagePattern({ cmd: 'sum' })
  sum(@Payload() data: number[]): number {
    return sum(...data);
  }

  @MessagePattern({ cmd: 'multiply' })
  multiply(@Payload() data: number[]): number {
    return multiply(...data);
  }
}
