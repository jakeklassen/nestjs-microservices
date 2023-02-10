import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { multiply, sum } from '@acme-corp/math';

@Controller()
export class MathController {
  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    return sum(...data);
  }

  @MessagePattern({ cmd: 'multiply' })
  multiply(data: number[]): number {
    return multiply(...data);
  }
}
