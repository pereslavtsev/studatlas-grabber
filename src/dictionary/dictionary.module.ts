import { Module } from '@nestjs/common';
import { DivisionsController } from './controllers/divisions.controller';
import { FacultiesController } from './controllers/faculties.controller';
import { GroupsController } from './controllers/groups.controller';
import { SpecialitiesController } from './controllers/specialities.controller';
import { DivisionsService } from './services/divisions.service';
import { FacultiesService } from './services/faculties.service';
import { GroupsService } from './services/groups.service';
import { SpecialitiesService } from './services/specialities.service';

@Module({
  providers: [
    FacultiesService,
    DivisionsService,
    GroupsService,
    SpecialitiesService,
  ],
  exports: [
    FacultiesService,
    DivisionsService,
    GroupsService,
    SpecialitiesService,
  ],
  controllers: [
    FacultiesController,
    DivisionsController,
    GroupsController,
    SpecialitiesController,
  ],
})
export class DictionaryModule {}
