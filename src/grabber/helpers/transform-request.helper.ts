import * as qs from 'qs';

export const transformRequest = (data, headers) => {
  // console.log(data, headers);
  return qs.stringify(data);
};
