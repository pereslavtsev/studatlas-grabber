import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from 'grpc';
import { GetDivisionRequest } from '../interfaces/requests/get-division-request.interface';
import { ListDivisionsRequest } from '../interfaces/requests/list-divisions-request.interface';
import { DivisionsService } from '../services/divisions.service';

@Controller()
export class DivisionsController {
  constructor(private readonly divisionsService: DivisionsService) {}

  @GrpcMethod('DivisionService', 'GetDivision')
  async findOne({ id, academyId }: GetDivisionRequest) {
    const division = await this.divisionsService.fetchById(id, academyId);
    if (!division) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Division is not found',
      });
    }
    return { data: [division] };
  }

  @GrpcMethod('DivisionService', 'ListDivisions')
  async findAll({ academyId }: ListDivisionsRequest) {
    const divisions = await this.divisionsService.fetchAll(academyId);
    return { data: divisions };
  }
}
