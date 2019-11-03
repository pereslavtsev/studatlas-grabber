import { Module } from '@nestjs/common';
import { AcademiesModule } from './academies/academies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './shared/services/mongoose-config.service';
import * as path from 'path';
import { ConfigModule } from 'nestjs-config';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '**/!(*.d).config.{ts,js}'), {
      modifyConfigName: name => name.replace('.config', ''),
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    AcademiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
