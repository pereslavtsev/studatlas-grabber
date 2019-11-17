import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { InjectConfig } from 'nestjs-config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(@InjectConfig() private readonly config) {
    this.config = config;
  }

  createMongooseOptions(): MongooseModuleOptions {
    const { uri } = this.config.get('mongoose');
    return {
      uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
