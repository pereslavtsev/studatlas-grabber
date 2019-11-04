import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import * as grpc from 'grpc';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { AcademyOrder } from './interfaces/academy-order.enum';
import { Academy } from './interfaces/academy.interface';

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
    try {
      const academy = await this.academyModel.findById(id).exec();
      if (!academy) {
        throw new RpcException({
          status: grpc.status.NOT_FOUND,
          message: 'Academy is not found',
        });
      }
      return _.pick(academy, this.academyFields) as Academy;
    } catch (e) {
      switch (e.kind) {
        case 'ObjectId': {
          throw new RpcException({
            status: grpc.status.CANCELLED,
            message: 'Failed ID',
          });
        }
        default: {
          throw new RpcException({
            status: grpc.status.UNKNOWN,
          });
        }
      }
    }
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
