import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcNotFoundException } from '../../shared/exceptions/grpc-not-found.exception';
import { GetDivisionRequest } from '../interfaces/requests/get-division-request.interface';
import { ListDivisionsRequest } from '../interfaces/requests/list-divisions-request.interface';
import { DivisionsService } from '../services/divisions.service';
import { AbstractDictionaryController } from './abstract-dictionary.controller';

@Controller()
export class DivisionsController extends AbstractDictionaryController {
  constructor(private readonly divisionsService: DivisionsService) {
    super();
  }

  @GrpcMethod('DivisionService', 'GetDivision')
  async findOne({ id, academyId }: GetDivisionRequest) {
    const division = await this.divisionsService.fetchById(id, academyId);
    if (!division) {
      throw new GrpcNotFoundException('Division is not found');
    }
    return { data: [division] };
  }

  @GrpcMethod('DivisionService', 'ListDivisions')
  async findAll({ academyId }: ListDivisionsRequest) {
    const divisions = await this.divisionsService.fetchAll(academyId);
    return { data: divisions };
  }
}
