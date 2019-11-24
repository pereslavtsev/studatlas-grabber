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
  async findOne({ id, academyId }: GetDivisionDto) {
    const division = await this.divisionsService.fetchById(id, academyId);
    if (!division) {
      throw new GrpcNotFoundException('Division is not found');
    }
    return { data: [division] };
  }

  @GrpcMethod('DivisionService', 'ListDivisions')
  @UsePipes(new ValidationPipe())
  async findAll({ academyId }: ListDivisionsDto) {
    const divisions = await this.divisionsService.fetchAll(academyId);
    return { data: divisions };
  }
}
