import { Module } from '@nestjs/common';
import { AcademiesController } from './academies.controller';
import { AcademiesService } from './academies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AcademySchema } from './schemas/academy.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Academy', schema: AcademySchema, collection: 'academies' }],
  )],
  controllers: [AcademiesController],
  providers: [AcademiesService],
})
export class AcademiesModule {}
