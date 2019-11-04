import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import * as _ from 'lodash';
import { FacultiesService } from './faculties.service';
import { FacultyOrder } from './interfaces/faculty-order.enum';
import { ListFacultiesRequest } from './interfaces/list-faculties-request.interface';

@Controller()
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

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
