import { Schema } from '../../grabber/interfaces/schema.interface';

export const SCHEDULE_ITEM_SCHEMA: Schema = {
  attributes: [
    {
      name: 'year',
      type: 'numeric',
      columns: ['Курс'],
    },
    {
      name: 'group',
      type: 'text',
      columns: ['Группа'],
    },
    {
      name: 'groupId',
      type: 'numeric',
      columns: ['Группа'],
    },
    {
      name: 'curriculum',
      type: 'text',
      columns: ['Учебный План'],
    },
  ],
};
