import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
import * as cookie from 'cookie';
import { Headers } from 'http-headers-js';
import * as _ from 'lodash';
import { AcademyVersion } from '../../academies/enums/academy-version.enum';
import { Academy } from '../../academies/interfaces/academy.interface';
import { GrpcUnknownException } from '../../shared/exceptions/grpc-unknown.exception';
import { VIEW_STATE } from '../constants/params.constants';
import { transformData } from '../helpers/transform-data.helper';
import { SOURCES } from '../mocks/sources.mock';

const onFulfilled = ({ disabledSources, version }: Academy) => async config => {
  /** In dev, intercepts request and logs it into console for dev */
  AxiosLogger.requestLogger(config);

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
      const helperClient = axios.create({
        baseURL: config.baseURL,
        params: config.params,
        withCredentials: true,
      });
      helperClient.interceptors.request.use(AxiosLogger.requestLogger);
      const { data, headers } = await helperClient.get(config.url);

      switch (version) {
        case AcademyVersion.Classic: {
          break;
        }
        case AcademyVersion.Modern:
        default: {
          const responseCookies = headers[Headers.SET_COOKIE.toLowerCase()].map(value =>
            cookie.parse(value),
          );
          const antiXsrfTokenCookie = _.find(responseCookies, c => _.has(c, '__AntiXsrfToken'));
          if (!antiXsrfTokenCookie) {
            throw new GrpcUnknownException();
          }
          // кладет кукисы в заголовок запроса - без этого будет валится оишбка на любой пост-запрос
          config.headers = {
            ...config.headers,
            [Headers.COOKIE]: headers[Headers.SET_COOKIE.toLowerCase()],
          };
          break;
        }
      }

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
  AxiosLogger.errorLogger(error);
  return Promise.reject(error);
};

export const requestInterceptor = (academy: Academy) => [onFulfilled(academy), onRejected];
