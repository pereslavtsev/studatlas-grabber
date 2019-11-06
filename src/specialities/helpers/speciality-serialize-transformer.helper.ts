import * as _ from 'lodash';
import { Speciality } from '../interfaces/speciality.interface';

export const specialitySerializeTransformerHelper = (record: Speciality) => {
  const filteredRecord = _.omit(record, ['facultyId', 'divisionId']);
  return {
    ...filteredRecord,
    division: {
      id: record.divisionId,
      name: record.division,
    },
    faculty: {
      id: record.facultyId,
      name: record.faculty,
    },
  };
};
