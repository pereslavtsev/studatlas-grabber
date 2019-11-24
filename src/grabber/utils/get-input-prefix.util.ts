import * as _ from 'lodash';
import { PostData } from '../interfaces/post-data.interface';

export const getInputPrefix = (oldData: PostData, transformedData: PostData) => {
  const transformedKeys = _.keys(transformedData).filter(key => key.substring(0, 2) !== '__');
  let prefix = '';
  transformedKeys.find(key => {
    const oldKey = _.keys(oldData).find(o => key.includes(o));
    prefix = key.split(oldKey).join('');
    return !!oldKey;
  });
  return prefix;
};
