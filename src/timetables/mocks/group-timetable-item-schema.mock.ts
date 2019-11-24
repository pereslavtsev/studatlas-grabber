import { Schema } from '../../grabber/interfaces/schema.interface';

export const GROUP_TIMETABLE_ITEM_SCHEMA: Schema = {
  attributes: [
    {
      name: 'groupId',
      type: 'id',
      columns: ['Группа'],
    },
    {
      name: 'group',
      type: 'text',
      columns: ['Группа'],
    },
    {
      name: 'year',
      type: 'numeric',
      columns: ['Курс'],
    },
    {
      name: 'curriculum',
      type: 'text',
      columns: ['Название Специальности'],
    },
  ],
};
