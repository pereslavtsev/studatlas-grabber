import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `localhost:${process.env.PORT || 50051}`,
    package: 'grabber',
    protoPath: join(__dirname, '../grabber.proto'),
  },
};
