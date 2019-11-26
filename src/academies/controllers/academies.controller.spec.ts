import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AcademySchema } from '../schemas/academy.schema';
import { AcademiesService } from '../services/academies.service';
import { AcademiesController } from './academies.controller';

describe('Academies Controller', () => {
  let controller: AcademiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: 'Academy', schema: AcademySchema, collection: 'academies' },
        ]),
      ],
      controllers: [AcademiesController],
      providers: [AcademiesService],
    }).compile();

    controller = module.get<AcademiesController>(AcademiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
