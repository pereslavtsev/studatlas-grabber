import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Academy } from './interfaces/academy.interface';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { AcademyOrder } from './interfaces/academy-order.enum';

@Injectable()
export class AcademiesService {
  constructor(
    @InjectModel('Academy') private readonly academyModel: Model<Academy>,
  ) {}

  academyFields = [
    'id',
    'name',
    'alias',
    'abbreviation',
    'website',
    'endpoint',
    'version',
  ];

  async findById(id: string): Promise<Academy> {
    const academy = await this.academyModel.findById(id).exec();
    return _.pick(academy, this.academyFields) as Academy;
  }

  async findAll(orderBy: AcademyOrder): Promise<Academy[]> {
    const academies = await this.academyModel
      .find(
        {},
        null,
        orderBy !== AcademyOrder.Default
          ? { sort: { [orderBy.toLowerCase()]: 1 } }
          : {},
      )
      .exec();
    return academies.map(
      academy => _.pick(academy, this.academyFields) as Academy,
    );
  }
}
