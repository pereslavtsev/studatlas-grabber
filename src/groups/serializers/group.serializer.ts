import { Serializer } from 'jsonapi-serializer';
import { groupSerializeTransformerHelper } from '../helpers/group-serialize-transformer.helper';

export const groupSerializer = new Serializer('groups', {
  attributes: [
    'name',
    'year',
    'specialityId',
    'speciality',
    'countAll',
    'countCommon',
    'countTargeted',
    'countSpecial',
    'curricula',
  ],
  keyForAttribute: 'camelCase',
  // @ts-ignore
  speciality: {
    ref: 'id',
    attributes: ['name'],
  },
  transform: groupSerializeTransformerHelper,
});
