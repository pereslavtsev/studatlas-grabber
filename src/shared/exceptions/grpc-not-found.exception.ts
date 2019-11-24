import { RpcException } from '@nestjs/microservices';
import * as grpc from 'grpc';

export class GrpcNotFoundException extends RpcException {
  constructor(message?: string) {
    super({
      status: grpc.status.NOT_FOUND,
      message,
    });
  }
}
