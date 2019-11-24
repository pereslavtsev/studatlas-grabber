import { Schema } from '../../grabber/interfaces/schema.interface';

export const GROUP_DOCUMENT_ITEM_SCHEMA: Schema = {
  attributes: [
    {
      name: 'id',
      columns: ['Дисциплина'],
      type: 'id',
    },
    {
      name: 'subject',
      columns: ['Дисциплина'],
      type: 'text',
    },
    {
      name: 'type',
      columns: ['Тип ведомости'],
      type: 'text',
    },
    {
      name: 'status',
      columns: ['Закрыта'],
      type: 'text',
    },
  ],
};
