import { Serializer } from 'jsonapi-serializer';
import { reportSerializeTransformerHelper } from '../helpers/report-serialize-transformer.helper';

export const reportSerializer = new Serializer('reports', {
  attributes: [
    'name',
    'year',
    'speciality',
    'count',
    'curricula',
  ],
  keyForAttribute: 'camelCase',
  // @ts-ignore
  group: {
    ref: 'id',
    attributes: ['name'],
  },
  transform: reportSerializeTransformerHelper,
});
