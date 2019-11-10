import { Serializer } from 'jsonapi-serializer';
import { bookSerializeTransformerHelper } from '../helpers/book-serialize-transformer.helper';

export const bookSerializer = new Serializer('books', {
  attributes: ['code', 'groupId'],
  keyForAttribute: 'camelCase',
  // @ts-ignore
  group: {
    ref: 'id',
    attributes: ['name'],
  },
  transform: bookSerializeTransformerHelper,
});
