import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { BooksModule } from './books/books.module';
import { CurriculaModule } from './curricula/curricula.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { DocumentsModule } from './documents/documents.module';
import { ReportsModule } from './reports/reports.module';
import { SchedulesModule } from './schedules/schedules.module';
import { MongooseConfigService } from './shared/services/mongoose-config.service';
import { SharedModule } from './shared/shared.module';
import { StatisticsModule } from './statistics/statistics.module';
import { TimetablesModule } from './timetables/timetables.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '**/!(*.d).config.{ts,js}'), {
      modifyConfigName: name => name.replace('.config', ''),
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    DictionaryModule,
    SharedModule,
    StatisticsModule,
    BooksModule,
    ReportsModule,
    DocumentsModule,
    CurriculaModule,
    SchedulesModule,
    TimetablesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
