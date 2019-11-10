import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { BooksModule } from './books/books.module';
import { DivisionsModule } from './divisions/divisions.module';
import { FacultiesModule } from './faculties/faculties.module';
import { GroupsModule } from './groups/groups.module';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
