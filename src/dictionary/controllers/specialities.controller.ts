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
  async findOne({ id, academyId }: GetSpecialityDto) {
    const speciality = await this.specialitiesService.fetchById(id, academyId);
    if (!speciality) {
      throw new GrpcNotFoundException('Speciality is not found');
    }
    return { data: [speciality] };
  }

  @GrpcMethod('SpecialityService', 'ListSpecialities')
  @UsePipes(new ValidationPipe())
  async findAll({ academyId }: ListSpecialitiesDto) {
    const specialities = await this.specialitiesService.fetchAll(academyId);
    return { data: specialities };
  }

  @GrpcMethod('SpecialityService', 'ListFacultySpecialities')
  @UsePipes(new ValidationPipe())
  async findByFacultyId({ facultyId, academyId }: ListFacultySpecialitiesDto) {
    const specialities = await this.specialitiesService.fetchByFacultyId(facultyId, academyId);
    return { data: specialities };
  }
}
