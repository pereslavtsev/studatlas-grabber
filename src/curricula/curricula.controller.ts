import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CurriculaService } from './curricula.service';
import { ListFacultyCurricula } from './interfaces/requests/list-faculty-curricula.interface';

@Controller()
export class CurriculaController {
  constructor(private readonly curriculaService: CurriculaService) {}

  @GrpcMethod('CurriculaService', 'ListFacultyCurricula')
  async findByFacultyId({ academyId, years, facultyId }: ListFacultyCurricula) {
    const curricula = await this.curriculaService.fetchByFaculty({
      academyId,
      years,
      facultyId,
    });
    return { data: curricula };
  }
}
