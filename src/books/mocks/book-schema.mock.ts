import { Schema } from '../../grabber/interfaces/schema.interface';

export const BOOK_SCHEMA: Schema = {
  attributes: [
    {
      name: 'id',
      type: 'id',
      columns: ['Номер Зачетной Книжки'],
    },
    {
      name: 'code',
      type: 'text',
      columns: ['Номер Зачетной Книжки'],
    },
    {
      name: 'groupId',
      type: 'id',
      columns: ['Группа'],
    },
  ],
};
