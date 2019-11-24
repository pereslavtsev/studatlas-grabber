import { RpcException } from '@nestjs/microservices';
import * as grpc from 'grpc';

export class GrpcUnknownException extends RpcException {
  constructor(message?: string ) {
    super({
      status: grpc.status.UNKNOWN,
      message,
    });
  }
}
