import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import SPECIAL_PARAMS, { CALLBACK_ID } from '../../grabber/constants/params.constants';
import { PostData } from '../interfaces/post-data.interface';
import { TransformedPostData } from '../interfaces/transformed-post-data.interface';

export const transformData = (html: string, data: PostData): TransformedPostData => {
  const $ = cheerio.load(html);
  const hiddenFields = $(`input[type=hidden]`)
    .toArray()
    .map(value => {
      return {
        name: $(value).attr('name'),
        value: $(value).val(),
      };
    });
  const additionalParams = _.chain(hiddenFields)
    .keyBy('name')
    .mapValues('value')
    .value();
  let fixedData = _.mapKeys(data, (value, key) => {
    if (_.includes(SPECIAL_PARAMS, key)) {
      return key;
    }
    // скорректированное имя инпута для текущего сайта
    // без этого фикса никакие POST-запросы не будут проходить
    // console.log(key, value, fixedDataField);
    return $(`[name*="${key}"]`).attr('name');
  });
  fixedData = _.mapValues(fixedData, (value, key) => {
    if (key === CALLBACK_ID) {
      const grid = $(`table[id*="${value}"]`);
      return grid ? grid.attr('id').replace(/_/g, '$') : value;
    }
    return value;
  });
  const transformedData = _.merge(additionalParams, fixedData);
  return transformedData as TransformedPostData;
};
