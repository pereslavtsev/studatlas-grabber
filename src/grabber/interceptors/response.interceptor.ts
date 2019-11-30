import * as dJSON from 'dirty-json';
import { Headers, MimeTypes } from 'http-headers-js';
import * as _ from 'lodash';
import { GrpcUnknownException } from '../../shared/exceptions/grpc-unknown.exception';

const onFulfilled = response => {
  const contentType = response.headers[Headers.CONTENT_TYPE.toLowerCase()];
  if (!_.isString(contentType) && contentType.includes(MimeTypes.Text.HTML)) {
    return response;
  }
  const regEx = /\/\S+\/*DX\*\/\((.*?)\)$/gm;
  let match = regEx.exec(response.data);
  let parsedResponse;

  while (!!match) {
    parsedResponse = dJSON.parse(
      match[1]
        .replace(/< td/g, '<td')
        .replace(/< tr/g, '<tr')
        .replace(/\/script>/g, '</script>'),
    );
    match = regEx.exec(response.data);
  }

  if (parsedResponse && parsedResponse.result && parsedResponse.result.html) {
    return {
      ...response,
      data: parsedResponse.result.html,
    };
  } else {
    throw new GrpcUnknownException('parsedResponse.result.html');
  }
};

const onRejected = error => {
  // tslint:disable-next-line:no-console
  // console.error(error);
  return Promise.reject(error);
};

export const responseInterceptor = [onFulfilled, onRejected];
