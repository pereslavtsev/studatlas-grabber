import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListFacultyCurriculaDto } from '../dto/list-faculty-curricula.dto';
import { CurriculaService } from '../services/curricula.service';

@Controller()
export class CurriculaController {
  constructor(private readonly curriculaService: CurriculaService) {}

  @GrpcMethod('CurriculaService', 'ListFacultyCurricula')
  @UsePipes(new ValidationPipe())
  async findByFacultyId({ academyId, years, facultyId }: ListFacultyCurriculaDto) {
    const curricula = await this.curriculaService.fetchByFaculty({
      academyId,
      years,
      facultyId,
    });
    return { data: curricula };
  }
}
