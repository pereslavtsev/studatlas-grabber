import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from 'grpc';
import { DivisionsService } from './divisions.service';
import { GetDivisionRequest } from './interfaces/get-division-request.interface';
import { ListDivisionsRequest } from './interfaces/list-divisions-request.interface';
import { divisionSerializer } from './serializers/division.serializer';

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
    return divisionSerializer.serialize([division]);
  }

  @GrpcMethod('DivisionService', 'ListDivisions')
  async findAll({ academyId }: ListDivisionsRequest) {
    const divisions = await this.divisionsService.fetchAll(academyId);
    return divisionSerializer.serialize(divisions);
  }
}
