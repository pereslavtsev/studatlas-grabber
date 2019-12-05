import { Headers, MimeTypes } from 'http-headers-js';

export const DEFAULT_HEADERS = {
  [Headers.CONTENT_TYPE]: MimeTypes.Application.X.WWW_FORM_URLENCODED,
};
