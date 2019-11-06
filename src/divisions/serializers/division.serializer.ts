import { Serializer } from 'jsonapi-serializer';

export const divisionSerializer = new Serializer('division', {
  attributes: [
    'name',
    'abbreviation',
    'head',
    'phone',
    'room',
  ],
  keyForAttribute: 'camelCase',
});
