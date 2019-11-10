import { Serializer } from 'jsonapi-serializer';

export const academySerializer = new Serializer('academies', {
  attributes: [
    'name',
    'alias',
    'abbreviation',
    'website',
    'endpoint',
    'version',
    'disabledSources',
  ],
  keyForAttribute: 'camelCase',
});
