import * as _ from 'lodash';
import { Statistics } from '../interfaces/statistics.interface';

export const statisticsSerializeTransformerHelper = (record: Statistics) => {
  const filteredRecord = _.omit(record, ['facultyId', 'divisionId']);
  return {
    ...filteredRecord,
    division: {
      id: record.divisionId,
    },
    faculty: {
      id: record.facultyId,
    },
  };
};
