import { Iconv } from 'iconv';
import { Buffer } from 'safe-buffer';

const iconv = new Iconv('CP1251', 'UTF-8');

export const transformResponse = response => {
  // try to fix charset
  try {
    response = iconv
      .convert(Buffer.from(response, 'binary'))
      .toString();
    return response;
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log({ e });
    return response;
  }
};
