import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from 'grpc';
import { FacultiesService } from './faculties.service';
import { GetFacultyRequest } from './interfaces/get-faculty-request.interface';
import { ListFacultiesRequest } from './interfaces/list-faculties-request.interface';
import { facultySerializer } from './serializers/faculty.serializer';

@Controller()
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  @GrpcMethod('FacultyService', 'GetFaculty')
  async findOne({ id, academyId }: GetFacultyRequest) {
    const faculty = await this.facultiesService.fetchById(id, academyId);
    if (!faculty) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Faculty is not found',
      });
    }
    return facultySerializer.serialize([faculty]);
  }

  @GrpcMethod('FacultyService', 'ListFaculties')
  async findAll({ academyId }: ListFacultiesRequest) {
    const faculties = await this.facultiesService.fetchAll(academyId);
    return facultySerializer.serialize(faculties);
  }
}
