import { Serializer } from 'jsonapi-serializer';
import { entrySerializeTransformerHelper } from '../helpers/entry-serialize-transformer.helper';

export const entrySerializer = new Serializer('entries', {
  attributes: [
    'semester',
    'subject',
    'mark',
    'hours',
    'teacher',
    'unit',
    'type',
  ],
  keyForAttribute: 'camelCase',
  // @ts-ignore
  document: {
    ref: 'id',
  },
  transform: entrySerializeTransformerHelper,
});
