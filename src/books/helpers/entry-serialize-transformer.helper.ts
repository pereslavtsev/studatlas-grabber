import { Entry } from '../interfaces/entry.interface';

export const entrySerializeTransformerHelper = (record: Entry) => {
  return {
    ...record,
    document: {
      id: record.id,
    },
  };
};
