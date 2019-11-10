import * as _ from 'lodash';
import { Report } from '../interfaces/report.interface';

export const reportSerializeTransformerHelper = (record: Report) => {
  const filteredRecord = _.omit(record, [
    'year',
    'speciality',
    'count',
    'curricula',
  ]);
  return {
    ...filteredRecord,
    group: {
      id: record.id,
      name: record.group,
      year: record.year,
      speciality: record.speciality,
      countAll: record.count,
      curricula: record.curricula,
    },
  };
};
