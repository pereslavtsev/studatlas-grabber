import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import * as grpc from 'grpc';
import { Model } from 'mongoose';
import { GrpcNotFoundException } from '../../shared/exceptions/grpc-not-found.exception';
import { GrpcUnknownException } from '../../shared/exceptions/grpc-unknown.exception';
import { Academy } from '../interfaces/academy.interface';

@Injectable()
export class AcademiesService {
  constructor(
    @InjectModel('Academy') private readonly academyModel: Model<Academy>,
  ) {}

  async findById(id: string): Promise<Academy> {
    let academy;
    try {
      academy = await this.academyModel.findById(id).exec();
    } catch (e) {
      switch (e.kind) {
        case 'ObjectId': {
          throw new RpcException({
            status: grpc.status.CANCELLED,
            message: 'Failed ID',
          });
        }
        default: {
          throw new GrpcUnknownException();
        }
      }
    }
    if (!academy) {
      throw new GrpcNotFoundException('Academy is not found');
    }
    return academy;
  }

  findAll(): Promise<Academy[]> {
    return this.academyModel.find().exec();
  }
}
