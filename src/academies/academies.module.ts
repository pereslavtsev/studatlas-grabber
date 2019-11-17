import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcademiesController } from './academies.controller';
import { AcademiesService } from './academies.service';
import { AcademySchema } from './schemas/academy.schema';

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
