import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcNotFoundException } from '../../shared/exceptions/grpc-not-found.exception';
import { GetSpecialityRequest } from '../interfaces/requests/get-speciality-request.interface';
import { ListFacultySpecialitiesRequest } from '../interfaces/requests/list-faculty-specialities-request.interface';
import {
  ListSpecialitiesRequest,
} from '../interfaces/requests/list-specialities-request.interface';
import { SpecialitiesService } from '../services/specialities.service';
import { AbstractDictionaryController } from './abstract-dictionary.controller';

@Controller()
export class SpecialitiesController extends AbstractDictionaryController {
  constructor(private readonly specialitiesService: SpecialitiesService) {
    super();
  }

  @GrpcMethod('SpecialityService', 'GetSpeciality')
  async findOne({ id, academyId }: GetSpecialityRequest) {
    const speciality = await this.specialitiesService.fetchById(id, academyId);
    if (!speciality) {
      throw new GrpcNotFoundException('Speciality is not found');
    }
    return { data: [speciality] };
  }

  @GrpcMethod('SpecialityService', 'ListSpecialities')
  async findAll({ academyId }: ListSpecialitiesRequest) {
    const specialities = await this.specialitiesService.fetchAll(academyId);
    return { data: specialities };
  }

  @GrpcMethod('SpecialityService', 'ListFacultySpecialities')
  async findByFacultyId({ facultyId, academyId }: ListFacultySpecialitiesRequest) {
    const specialities = await this.specialitiesService.fetchByFacultyId(facultyId, academyId);
    return { data: specialities };
  }
}
