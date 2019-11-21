import { Controller } from '@nestjs/common';
import { EntityRequest } from '../../grabber/interfaces/requests/entity-request.interface';

@Controller()
export abstract class AbstractDictionaryController {
  abstract async findOne<T>(data: EntityRequest): Promise<{ data: T[] }>;
  abstract async findAll<T>(data: EntityRequest): Promise<{ data: T[] }>;
}
