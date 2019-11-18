import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { BooksModule } from './books/books.module';
import { CurriculaModule } from './curricula/curricula.module';
import { DivisionsModule } from './divisions/divisions.module';
import { DocumentsModule } from './documents/documents.module';
import { FacultiesModule } from './faculties/faculties.module';
import { GroupsModule } from './groups/groups.module';
import { ReportsModule } from './reports/reports.module';
import { MongooseConfigService } from './shared/services/mongoose-config.service';
import { SharedModule } from './shared/shared.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '**/!(*.d).config.{ts,js}'), {
      modifyConfigName: name => name.replace('.config', ''),
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    FacultiesModule,
    GroupsModule,
    SharedModule,
    DivisionsModule,
    SpecialitiesModule,
    StatisticsModule,
    BooksModule,
    ReportsModule,
    DocumentsModule,
    CurriculaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
