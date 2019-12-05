import { Iconv } from 'iconv';
import { Buffer } from 'safe-buffer';
import { CustomLogger } from '../../shared/services/custom-logger.service';

const iconv = new Iconv('CP1251', 'UTF-8');

export const transformResponse = response => {
  if (typeof response === 'string') {
    console.log('not buffer');
  }
  const bufferedResponse = Buffer.from(response, 'binary');

  try {
    response = iconv.convert(bufferedResponse).toString();
    return response;
  } catch (e) {
    new CustomLogger('Axios').log('Кодировка полученной страницы не нуждается в преобразовании');
    return bufferedResponse.toString();
  }
};
