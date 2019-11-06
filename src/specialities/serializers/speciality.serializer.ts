import { Serializer } from 'jsonapi-serializer';
import { specialitySerializeTransformerHelper } from '../helpers/speciality-serialize-transformer.helper';
import { SPECIALITY_SCHEMA } from '../mocks/speciality-schema.mock';

export const specialitySerializer = new Serializer('specialities', {
  attributes: SPECIALITY_SCHEMA.attributes
    .map(attribute => attribute.name)
    .filter(attribute => attribute !== 'id'),
  keyForAttribute: 'camelCase',
  // @ts-ignore
  division: {
    ref: 'id',
    attributes: ['name'],
  },
  // @ts-ignore
  faculty: {
    ref: 'id',
    attributes: ['name'],
  },
  transform: specialitySerializeTransformerHelper,
});
