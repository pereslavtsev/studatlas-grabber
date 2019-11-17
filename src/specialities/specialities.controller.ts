import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from 'grpc';
import { GetSpecialityRequest } from './interfaces/requests/get-speciality-request.interface';
import { ListFacultySpecialitiesRequest } from './interfaces/requests/list-faculty-specialities-request.interface';
import { ListSpecialitiesRequest } from './interfaces/requests/list-specialities-request.interface';
import { SpecialitiesService } from './specialities.service';

@Controller()
export class SpecialitiesController {
  constructor(private readonly specialitiesService: SpecialitiesService) {}

  @GrpcMethod('SpecialityService', 'GetSpeciality')
  async findOne({ id, academy_id }: GetSpecialityRequest) {
    const speciality = await this.specialitiesService.fetchById(id, academy_id);
    if (!speciality) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Speciality is not found',
      });
    }
    return { data: [speciality] };
  }

  @GrpcMethod('SpecialityService', 'ListSpecialities')
  async findAll({ academyId }: ListSpecialitiesRequest) {
    const specialities = await this.specialitiesService.fetchAll(academyId);
    return { data: specialities };
  }

  @GrpcMethod('SpecialityService', 'ListFacultySpecialities')
  async findByFacultyId({
    facultyId,
    academyId,
  }: ListFacultySpecialitiesRequest) {
    const specialities = await this.specialitiesService.fetchByFacultyId(
      facultyId,
      academyId,
    );
    return { data: specialities };
  }
}
