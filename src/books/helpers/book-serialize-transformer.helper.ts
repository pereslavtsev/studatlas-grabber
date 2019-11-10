import * as _ from 'lodash';
import { Book } from '../interfaces/book.interface';

export const bookSerializeTransformerHelper = (record: Book) => {
  const filteredRecord = _.omit(record, ['groupId']);
  return {
    ...filteredRecord,
    group: {
      id: record.groupId,
    },
  };
};
