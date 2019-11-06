import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from 'grpc';
import * as _ from 'lodash';
import { DivisionsService } from './divisions.service';
import { DivisionOrder } from './interfaces/division-order.enum';
import { GetDivisionRequest } from './interfaces/get-division-request.interface';
import { ListDivisionsRequest } from './interfaces/list-divisions-request.interface';
import { divisionSerializer } from './serializers/division.serializer';

@Controller()
export class DivisionsController {
  constructor(private readonly divisionsService: DivisionsService) {}

  @GrpcMethod('DivisionService', 'GetDivision')
  async findOne({ id, academy_id }: GetDivisionRequest) {
    const division = await this.divisionsService.fetchById(id, academy_id);
    if (!division) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Division is not found',
      });
    }
    return divisionSerializer.serialize([division]);
  }

  @GrpcMethod('DivisionService', 'ListDivisions')
  async findAll({ order_by, academy_id }: ListDivisionsRequest) {
    const divisions = await this.divisionsService.fetch(academy_id);
    if (order_by === DivisionOrder.Default) {
      return divisionSerializer.serialize(divisions);
    }
    return divisionSerializer.serialize(
      _.sortBy(divisions, [order_by.toLowerCase()]),
    );
  }
}
