import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcademiesController } from './controllers/academies.controller';
import { AcademySchema } from './schemas/academy.schema';
import { AcademiesService } from './services/academies.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Academy', schema: AcademySchema, collection: 'academies' },
    ]),
  ],
  controllers: [AcademiesController],
  providers: [AcademiesService],
  exports: [AcademiesService],
})
export class AcademiesModule {}
