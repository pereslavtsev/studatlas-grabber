import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `0.0.0.0:${process.env.PORT || 5000}`,
    package: 'grabber',
    protoPath: join(__dirname, '../protos/grabber.proto'),
  },
};
