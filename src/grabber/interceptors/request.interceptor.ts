import axios from 'axios';
import * as _ from 'lodash';
import { VIEW_STATE } from '../constants/params.constants';
import { transformData } from '../helpers/transform-data.helper';
import { SOURCES } from '../mocks/sources.mock';

const onFulfilled = (disabledSources?: string[]) => async config => {
  /** In dev, intercepts request and logs it into console for dev */
  // tslint:disable-next-line:no-console
  // console.info(config);

  if (disabledSources && disabledSources.length) {
    const source = SOURCES.find(s => s.path.includes(config.url));
    if (!!source && _.includes(disabledSources, source.id)) {
      console.log(1);
    }
  }

  switch (config.method) {
    case 'POST':
    case 'post': {
      if (_.has(config.data, VIEW_STATE)) {
        break;
      }
      // доп. запрос для получения токенов и корректировки параметров запроса
      const { data } = await axios.get(config.url, {
        baseURL: config.baseURL,
        params: config.params,
      });

      config.data = transformData(data, config.data);
      break;
    }
    case 'GET':
    case 'get':
    default: {
      break;
    }
  }
  return config;
};

const onRejected = error => {
  // tslint:disable-next-line:no-console
  // console.error(error);
  return Promise.reject(error);
};

export const requestInterceptor = (disabledSources?: string[]) => [
  onFulfilled(disabledSources),
  onRejected,
];
