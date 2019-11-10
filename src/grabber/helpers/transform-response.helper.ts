import { Iconv } from 'iconv';
import { Buffer } from 'safe-buffer';

const iconv = new Iconv('CP1251', 'UTF-8');

export const transformResponse = response => {
  const bufferedResponse = Buffer.from(response, 'binary');
  try {
    response = iconv.convert(bufferedResponse).toString();
    return response;
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log({ e }); // значит, что кодировка не нуждается в преобразовании
    return bufferedResponse.toString();
  }
};
