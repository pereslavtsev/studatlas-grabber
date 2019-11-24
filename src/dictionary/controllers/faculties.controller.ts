import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcNotFoundException } from '../../shared/exceptions/grpc-not-found.exception';
import { GetFacultyDto } from '../dto/get-faculty-request.interface';
import { ListFacultiesDto } from '../dto/list-faculties.dto';
import { FacultiesService } from '../services/faculties.service';

@Controller()
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  @GrpcMethod('FacultyService', 'GetFaculty')
  @UsePipes(new ValidationPipe())
  async findOne({ id, academyId }: GetFacultyDto) {
    const faculty = await this.facultiesService.fetchById(id, academyId);
    if (!faculty) {
      throw new GrpcNotFoundException('Faculty is not found');
    }
    return { data: [faculty] };
  }

  @GrpcMethod('FacultyService', 'ListFaculties')
  @UsePipes(new ValidationPipe())
  async findAll({ academyId }: ListFacultiesDto) {
    const faculties = await this.facultiesService.fetchAll(academyId);
    return { data: faculties };
  }
}
