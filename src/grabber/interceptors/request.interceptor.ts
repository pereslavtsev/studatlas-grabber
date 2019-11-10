import axios from 'axios';
import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import { transformRequest } from '../helpers/transform-request.helper';
import { transformResponse } from '../helpers/transform-response.helper';

const onFulfilled = async config => {
  /** In dev, intercepts request and logs it into console for dev */
  // tslint:disable-next-line:no-console
  // console.info(config);
  switch (config.method) {
    case 'POST':
    case 'post': {
      if (_.has(config.data, '__VIEWSTATE')) {
        break;
      }
      // доп. запрос для получения токенов и корректировки параметров запроса
      const { data } = await axios.get(config.url, {
        baseURL: config.baseURL,
      });
      const $ = cheerio.load(data);
      const hiddenFields = $(`input[type=hidden]`)
        .toArray()
        .map(value => {
          return {
            name: $(value).attr('name'),
            value: $(value).val(),
          };
        });
      //.filter(value => value.name !== '__VIEWSTATE');
      const additionalParams = _.chain(hiddenFields)
        .keyBy('name')
        .mapValues('value')
        .value();
      const fixedData = _.mapKeys(config.data, (value, key) => {
        // скорректированное имя инпута для текущего сайта
        // без этого фикса никакие POST-запросы не будут проходить
        const fixedDataField = $(`[name*="${key}"]`).attr('name');
        //console.log(key, value, fixedDataField);
        return fixedDataField;
      });
      const newData = {
        __VIEWSTATEGENERATOR: 'FA37AF31',
        __VIEWSTATE:
          '/wEPDwUKMTk5MzkwMDcwMg9kFgJmD2QWAgIDD2QWBAIDD2QWAgIBD2QWAgIiDxYCHgdWaXNpYmxlaGQCBQ9kFgICAQ9kFgQCBA9kFgQCAQ8QDxYCHgtfIURhdGFCb3VuZGdkEBUPBNCQ0KIG0K3QuNCjBtCi0KLQnAbQkNCU0JwG0JjQodCYBtCY0KHQowTQl9CkBtCS0JHQpAbQkNCh0J8G0KbQlNCeBtCd0KHQogbQnNCf0J8G0JjQnNCQBtCf0JPQoQTQodCYFQ8CMzYCMzgCMzkCNDACNDECNDICNDMCNDQCNDUCNDYCNDgCNDkCNTACNTECNTIUKwMPZ2dnZ2dnZ2dnZ2dnZ2dnFgFmZAIFDxAPFgIfAWdkEBUBDNCu0KDQk9Cj0K3QoRUBATAUKwMBZxYBZmQCBg8QDxYCHwFnZBAVEwkyMDAyLTIwMDMJMjAwMy0yMDA0CTIwMDQtMjAwNQkyMDA1LTIwMDYJMjAwNi0yMDA3CTIwMDctMjAwOAkyMDA4LTIwMDkJMjAwOS0yMDEwCTIwMTAtMjAxMQkyMDExLTIwMTIJMjAxMi0yMDEzCTIwMTMtMjAxNAkyMDE0LTIwMTUJMjAxNS0yMDE2CTIwMTYtMjAxNwkyMDE3LTIwMTgJMjAxOC0yMDE5CTIwMTktMjAyMAkyMDIwLTIwMjEVEwkyMDAyLTIwMDMJMjAwMy0yMDA0CTIwMDQtMjAwNQkyMDA1LTIwMDYJMjAwNi0yMDA3CTIwMDctMjAwOAkyMDA4LTIwMDkJMjAwOS0yMDEwCTIwMTAtMjAxMQkyMDExLTIwMTIJMjAxMi0yMDEzCTIwMTMtMjAxNAkyMDE0LTIwMTUJMjAxNS0yMDE2CTIwMTYtMjAxNwkyMDE3LTIwMTgJMjAxOC0yMDE5CTIwMTktMjAyMAkyMDIwLTIwMjEUKwMTZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZxYBAhFkGAEFG2N0bDAwJENvbnRlbnRQYWdlJEdyaWRHcm91cA88KwAMAQgCAWSKP2fbN8Cv8TnurAm7Dy+mDDaSFBEoWK/4WCGdLeJNog==',
        __EVENTVALIDATION:
          '/wEdACP6dCLAG29xKS10MyqehVG4etggShbpeRI/8AQ5FqttlnSscQ75/noRe4unlsrYqUTiKXYL0JnxJOm0cRVdUpckKOuXFVq+fY8OeaRJ5MQaLQseNuYD7IoLGHzeCxu4quDxNnDwIZFHDJaihEWaLZIrxCcEBfRL/0HufpvgWTGGA+sSBlTxMlVn4RiCV36mxZCq7KqPw3pKqYW0922jt55J/KhveIYF67h6exBuNXU9sojsKEdN9NnFRApSZo0G05WuwXkHvvzaElV5ntMqKGoBjogFjMSq6p7v+IqR3w0ZoJINSpWyPtSxHVrCkyZbRBmYGVxX1QSEo4GiARRgaEng7A0WzwysNgu2rsgrTVIztHFDIF2+N0knUw1+mmUxOfrlhDBLeufTa8Hbto1yeBjhJnhrldoO/bCnEdVlap3ER9s0CT72waTvRUuE6CNjVYFf4L8SnkpQjhWDgFcHfDEosaa70rldrU4m9Z3ZKHdWqTi54DgwouMGHaR6uDqlrnWJovUqMw8Y+ti6Is6FCvAVfbyH2Mnot/q2EY1eoRCKYPImdF6rSjPGBWIQWNlGnE6kcNQR9B7z/5Lj4zBmS6C9j/KlH0S98SDMts0xcD1jzT++njNlPPjBPao84tLqhxLvEtGhoW6SrdbvqXeCwkacr97aE7XXhh7nZiqL5RrbxUrrE4el4nx4MNw/xF4Hp/BTjKr6Q0kmGwpM/BWjaDP0FaDqFw/dzymwQyMPlvCGGPrhJ9ThTBewwyiNw1SNnMlAmvMCqt8glYJ8Okd7xDqS',
        ctl00$ContentPage$cmbFacultets: '41',
        ctl00$ContentPage$cmbYears: '2018-2019',
      };
      console.log(555, newData);
      const res = await axios.post(config.url, newData, {
        baseURL: config.baseURL,
        withCredentials: true,
      })
      console.log('res', res.data)
      config.data = newData;
      //config.transformRequest = transformRequest;
      break;
    }
    case 'GET':
    case 'get':
    default: {
      config.responseType = 'arraybuffer';
      config.transformResponse = transformResponse;
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
