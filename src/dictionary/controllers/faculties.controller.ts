import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcNotFoundException } from '../../shared/exceptions/grpc-not-found.exception';
import { GetFacultyRequest } from '../interfaces/requests/get-faculty-request.interface';
import { ListFacultiesRequest } from '../interfaces/requests/list-faculties-request.interface';
import { FacultiesService } from '../services/faculties.service';
import { AbstractDictionaryController } from './abstract-dictionary.controller';

@Controller()
export class FacultiesController extends AbstractDictionaryController {
  constructor(private readonly facultiesService: FacultiesService) {
    super();
  }

  @GrpcMethod('FacultyService', 'GetFaculty')
  async findOne({ id, academyId }: GetFacultyRequest) {
    const faculty = await this.facultiesService.fetchById(id, academyId);
    if (!faculty) {
      throw new GrpcNotFoundException('Faculty is not found');
    }
    return { data: [faculty] };
  }

  @GrpcMethod('FacultyService', 'ListFaculties')
  async findAll({ academyId }: ListFacultiesRequest) {
    const faculties = await this.facultiesService.fetchAll(academyId);
    return { data: faculties };
  }
}
