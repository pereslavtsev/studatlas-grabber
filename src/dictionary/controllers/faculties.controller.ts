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
  async findOne(getFacultyDto: GetFacultyDto) {
    const response = await this.facultiesService.fetchById(getFacultyDto);
    if (!response.data.length) {
      throw new GrpcNotFoundException('Faculty is not found');
    }
    return response;
  }

  @GrpcMethod('FacultyService', 'ListFaculties')
  @UsePipes(new ValidationPipe())
  findAll(listFacultiesDto: ListFacultiesDto) {
    return this.facultiesService.fetchAll(listFacultiesDto);
  }
}
