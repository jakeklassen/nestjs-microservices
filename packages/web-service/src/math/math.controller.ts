import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MathService } from './math.service';

@Controller('math')
export class MathController {
  constructor(
    @Inject('MATH_SERVICE') private client: ClientProxy,
    @Inject(MathService) private mathService: MathService,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Post('sum')
  async sum(@Body() data: number[]): Promise<number> {
    const result = await firstValueFrom(
      this.client.send<number>({ cmd: 'sum' }, data),
    );

    await this.mathService.createCalculation({
      operation: 'sum',
      operands: data,
      result,
    });

    return result;
  }

  @Post('multiply')
  async multiply(@Body() data: number[]): Promise<number> {
    const result = await firstValueFrom(
      this.client.send<number>({ cmd: 'multiply' }, data),
    );

    await this.mathService.createCalculation({
      operation: 'multiply',
      operands: data,
      result,
    });

    return result;
  }
}
