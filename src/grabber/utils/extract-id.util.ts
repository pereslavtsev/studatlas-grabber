import * as _ from 'lodash';
import * as qs from 'query-string';

export const extractId = (href: string) => {
  const [, paramsStr] = href.split('?');
  const params = qs.parse(paramsStr, { parseNumbers: true });
  return _.has(params, 'id') ? params.id : undefined;
};
