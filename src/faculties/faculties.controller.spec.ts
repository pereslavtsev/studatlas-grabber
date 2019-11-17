import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AcademiesModule } from '../academies/academies.module';
import { AcademySchema } from '../academies/schemas/academy.schema';
import { GrabberModule } from '../grabber/grabber.module';
import { FacultiesController } from './faculties.controller';
import { FacultiesService } from './faculties.service';

describe('Faculties Controller', () => {
  let controller: FacultiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GrabberModule,
        AcademiesModule,
        MongooseModule.forFeature([
          { name: 'Academy', schema: AcademySchema, collection: 'academies' },
        ]),
      ],
      controllers: [FacultiesController],
      providers: [FacultiesService],
    }).compile();

    controller = module.get<FacultiesController>(FacultiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
