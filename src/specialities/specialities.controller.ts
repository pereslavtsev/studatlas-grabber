import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from 'grpc';
import * as _ from 'lodash';
import { GetFacultyRequest } from '../faculties/interfaces/get-faculty-request.interface';
import { ListFacultySpecialitiesRequest } from './interfaces/requests/list-faculty-specialities-request.interface';
import { ListSpecialitiesRequest } from './interfaces/requests/list-specialities-request.interface';
import { SpecialitiesOrder } from './interfaces/specialities-order.enum';
import { specialitySerializer } from './serializers/speciality.serializer';
import { SpecialitiesService } from './specialities.service';

@Controller()
export class SpecialitiesController {
  constructor(private readonly specialitiesService: SpecialitiesService) {}

  @GrpcMethod('SpecialityService', 'GetSpeciality')
  async findOne({ id, academy_id }: GetFacultyRequest) {
    const speciality = await this.specialitiesService.fetchById(id, academy_id);
    if (!speciality) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Speciality is not found',
      });
    }
    return specialitySerializer.serialize([speciality]);
  }

  @GrpcMethod('SpecialityService', 'ListSpecialities')
  async findAll({ order_by, academy_id }: ListSpecialitiesRequest) {
    const specialities = await this.specialitiesService.fetchAll(academy_id);
    if (order_by === SpecialitiesOrder.Default) {
      return specialitySerializer.serialize(specialities);
    }

    return specialitySerializer.serialize(
      _.sortBy(specialities, [order_by.toLowerCase()]),
    );
  }

  @GrpcMethod('SpecialityService', 'ListFacultySpecialities')
  async findByFacultyId({
    order_by,
    faculty_id,
    academy_id,
  }: ListFacultySpecialitiesRequest) {
    const specialities = await this.specialitiesService.fetchByFacultyId(
      faculty_id,
      academy_id,
    );
    if (order_by === SpecialitiesOrder.Default) {
      return specialitySerializer.serialize(specialities);
    }

    return specialitySerializer.serialize(
      _.sortBy(specialities, [order_by.toLowerCase()]),
    );
  }
}
