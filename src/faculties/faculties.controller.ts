import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from 'grpc';
import * as _ from 'lodash';
import { FacultiesService } from './faculties.service';
import { FacultyOrder } from './interfaces/faculty-order.enum';
import { GetFacultyRequest } from './interfaces/get-faculty-request.interface';
import { ListFacultiesRequest } from './interfaces/list-faculties-request.interface';

@Controller()
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  @GrpcMethod('FacultyService', 'GetFaculty')
  async findOne({ id, academy_id }: GetFacultyRequest) {
    const faculty = await this.facultiesService.fetchById(id, academy_id);
    if (!faculty) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Faculty is not found',
      });
    }
    return faculty;
  }

  @GrpcMethod('FacultyService', 'ListFaculties')
  async findAll({ order_by, academy_id }: ListFacultiesRequest) {
    const faculties = await this.facultiesService.fetch(academy_id);
    if (order_by === FacultyOrder.Default) {
      return { faculties };
    }
    return {
      faculties: _.sortBy(faculties, [order_by.toLowerCase()]),
    };
  }
}
