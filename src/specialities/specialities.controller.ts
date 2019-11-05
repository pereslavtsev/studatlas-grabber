import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from 'grpc';
import { Serializer } from 'jsonapi-serializer';
import * as _ from 'lodash';
import { GetFacultyRequest } from '../faculties/interfaces/get-faculty-request.interface';
import { ListSpecialitiesRequest } from './interfaces/list-specialities-request.interface';
import { SpecialitiesOrder } from './interfaces/specialities-order.enum';
import { SPECIALITY_SCHEMA } from './mocks/speciality-schema.mock';
import { SpecialitiesService } from './specialities.service';

const specialitySerializer = new Serializer('specialities', {
  attributes: SPECIALITY_SCHEMA.attributes
    .map(attribute => attribute.name)
    .filter(attribute => attribute !== 'id'),
  keyForAttribute: 'camelCase',
  // @ts-ignore
  faculty: {
    ref: 'id',
    // included: false,
    attributes: ['name'],
  },
});

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
    return speciality;
  }

  @GrpcMethod('SpecialityService', 'ListSpecialities')
  async findAll({ order_by, academy_id }: ListSpecialitiesRequest) {
    const specialities = (await this.specialitiesService.fetchAll(academy_id)).map(s => {
      return {
        ...(_.omit(s, ['facultyId', 'divisionId'])),
        faculty: {
          id: s.facultyId,
          name: s.faculty,
        },
      };
    });
    if (order_by === SpecialitiesOrder.Default) {
      console.log(specialitySerializer.serialize(specialities).included);
      return specialitySerializer.serialize(specialities);
    }







    return {
      data: _.sortBy(specialities, [order_by.toLowerCase()]),
    };
  }
}
