import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcNotFoundException } from '../../shared/exceptions/grpc-not-found.exception';
import { GetSpecialityDto } from '../dto/get-speciality.dto';
import { ListFacultySpecialitiesDto } from '../dto/list-faculty-specialities.dto';
import { ListSpecialitiesDto } from '../dto/list-specialities.dto';
import { SpecialitiesService } from '../services/specialities.service';

@Controller()
export class SpecialitiesController {
  constructor(private readonly specialitiesService: SpecialitiesService) {}

  @GrpcMethod('SpecialityService', 'GetSpeciality')
  @UsePipes(new ValidationPipe())
  async findOne(getSpecialityDto: GetSpecialityDto) {
    const response = await this.specialitiesService.fetchById(getSpecialityDto);
    if (!response.data.length) {
      throw new GrpcNotFoundException('Speciality is not found');
    }
    return response;
  }

  @GrpcMethod('SpecialityService', 'ListSpecialities')
  @UsePipes(new ValidationPipe())
  findAll(listSpecialitiesDto: ListSpecialitiesDto) {
    return this.specialitiesService.fetchAll(listSpecialitiesDto);
  }

  @GrpcMethod('SpecialityService', 'ListFacultySpecialities')
  @UsePipes(new ValidationPipe())
  findByFacultyId(listFacultySpecialitiesDto: ListFacultySpecialitiesDto) {
    return this.specialitiesService.fetchByFacultyId(listFacultySpecialitiesDto);
  }
}
