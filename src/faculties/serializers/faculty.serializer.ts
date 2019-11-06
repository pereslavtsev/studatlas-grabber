import { Serializer } from 'jsonapi-serializer';

export const facultySerializer = new Serializer('faculties', {
  attributes: [
    'name',
    'abbreviation',
    'head',
    'phone',
    'room',
  ],
  keyForAttribute: 'camelCase',
});
