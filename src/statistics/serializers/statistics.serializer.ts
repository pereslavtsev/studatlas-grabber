import { Serializer } from 'jsonapi-serializer';
import { statisticsSerializeTransformerHelper } from '../helpers/statistics-serialize-transformer.helper';
import { STATISTICS_SCHEMA } from '../mocks/statistics-schema.mock';

export const statisticsSerializer = new Serializer('statistics', {
  attributes: STATISTICS_SCHEMA.attributes.map(attribute => attribute.name),
  keyForAttribute: 'camelCase',
  // @ts-ignore
  division: {
    ref: 'id',
  },
  // @ts-ignore
  faculty: {
    ref: 'id',
  },
  transform: statisticsSerializeTransformerHelper,
});
