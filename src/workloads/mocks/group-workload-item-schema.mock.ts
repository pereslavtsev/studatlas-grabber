import { Schema } from '../../grabber/interfaces/schema.interface';

export const GROUP_WORKLOAD_ITEM_SCHEMA: Schema = {
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
      name: 'speciality',
      type: 'text',
      columns: ['Специальность'],
    },
    {
      name: 'countAll',
      type: 'numeric',
      columns: ['Студентов'],
    },
    {
      name: 'curriculum',
      type: 'text',
      columns: ['Учебный план'],
    },
  ],
};
