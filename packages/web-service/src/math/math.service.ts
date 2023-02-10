import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calculation } from './calculation.entity';

type CreateCalculationInput = Pick<
  Calculation,
  'operation' | 'operands' | 'result'
>;

@Injectable()
export class MathService {
  constructor(
    @InjectRepository(Calculation)
    private calculationRepository: Repository<Calculation>,
  ) {}

  async createCalculation(
    calculation: CreateCalculationInput,
  ): Promise<Calculation> {
    return this.calculationRepository.save(calculation);
  }
}
