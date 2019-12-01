import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcNotFoundException } from '../../shared/exceptions/grpc-not-found.exception';
import { GetDivisionDto } from '../dto/get-division.dto';
import { ListDivisionsDto } from '../dto/list-divisions.dto';
import { DivisionsService } from '../services/divisions.service';

@Controller()
export class DivisionsController {
  constructor(private readonly divisionsService: DivisionsService) {}

  @GrpcMethod('DivisionService', 'GetDivision')
  @UsePipes(new ValidationPipe())
  async findOne(getDivisionDto: GetDivisionDto) {
    const response = await this.divisionsService.fetchById(getDivisionDto);
    if (!response.data.length) {
      throw new GrpcNotFoundException('Division is not found');
    }
    return response;
  }

  @GrpcMethod('DivisionService', 'ListDivisions')
  @UsePipes(new ValidationPipe())
  findAll(listDivisionsDto: ListDivisionsDto) {
    return this.divisionsService.fetchAll(listDivisionsDto);
  }
}
