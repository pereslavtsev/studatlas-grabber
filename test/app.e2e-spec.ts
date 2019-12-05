import { INestApplication } from '@nestjs/common';
import { ClientProxy, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
// @ts-ignore
import request from 'supertest';
import { AcademiesModule } from '../src/academies/academies.module';
import { AcademySchema } from '../src/academies/schemas/academy.schema';
import { AcademiesService } from '../src/academies/services/academies.service';
import { AppModule } from '../src/app.module';
import { GrabberModule } from '../src/grabber/grabber.module';

describe('HeartbeatController (e2e)', () => {
  let app: INestApplication;
  let client: ClientProxy;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AcademiesModule, GrabberModule,     MongooseModule.forFeature([
        { name: 'Academy', schema: AcademySchema, collection: 'academies' },
      ])],
      providers: [AcademiesService],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.connectMicroservice({
      transport: Transport.GRPC,
      options: {
        package: 'grabber',
        protoPath: '../src/shared/protobuf/grabber.proto',
      },
    });

    await app.startAllMicroservicesAsync();
    await app.init();

    client = app.get('FACULTY_SERVICE');
    await client.connect();
  });

  afterAll(async () => {
    await app.close();
    client.close();
  });

  it('sends a level 1 heartbeat message to the HeartbeatService', done => {
    const response = client.send({ cmd: 'heartbeat' }, { type: 1 });

    response.subscribe(json => {
      expect(Date.parse(json.now)).toBeLessThanOrEqual(new Date().getTime());
      expect(json.originalRequest.type).toBe(1);

      done();
    });
  });
});
