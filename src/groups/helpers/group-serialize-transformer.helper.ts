import * as _ from 'lodash';

export const groupSerializeTransformerHelper = (record: any) => {
  const filteredRecord = _.omit(record, ['specialityId', 'speciality']);
  return {
    ...filteredRecord,
    speciality: {
      id: record.specialityId,
      name: record.speciality,
    },
  };
};
