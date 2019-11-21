import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AcademiesService } from './academies.service';
import { GetAcademyRequest } from './interfaces/get-academy-request.interface';

@Controller()
export class AcademiesController {
  constructor(private readonly academiesService: AcademiesService) {}

  @GrpcMethod('AcademyService', 'GetAcademy')
  async findOne({ id }: GetAcademyRequest) {
    // tslint:disable-next-line:no-console
    console.log(`Receive an academy by ID "${id}"...`);
    const academy = await this.academiesService.findById(id);
    // tslint:disable-next-line:no-console
    console.log('Response:', academy);
    return { data: [academy] };
  }

  @GrpcMethod('AcademyService', 'ListAcademies')
  async findAll() {
    const academies = await this.academiesService.findAll();
    return { data: academies };
  }
}
