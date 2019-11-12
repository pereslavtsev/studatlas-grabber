import axios from 'axios';
import * as _ from 'lodash';
import * as qs from 'qs';
import { VIEW_STATE } from '../constants/params.constants';
import { transformData } from '../helpers/transform-data.helper';
import { transformRequest } from '../helpers/transform-request.helper';
import { transformResponse } from '../helpers/transform-response.helper';

const onFulfilled = async config => {
  /** In dev, intercepts request and logs it into console for dev */
  // tslint:disable-next-line:no-console
  // console.info(config);
  switch (config.method) {
    case 'POST':
    case 'post': {
      if (_.has(config.data, VIEW_STATE)) {
        break;
      }
      // доп. запрос для получения токенов и корректировки параметров запроса
      const { data } = await axios.get(config.url, {
        baseURL: config.baseURL,
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

export const requestInterceptor = [onFulfilled, onRejected];
