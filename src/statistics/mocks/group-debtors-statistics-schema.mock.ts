import { Schema } from '../../grabber/interfaces/schema.interface';

export const GROUP_DEBTORS_STATISTICS_SCHEMA: Schema = {
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
      name: 'countAll',
      type: 'numeric',
      columns: ['Всего'],
    },
    {
      name: 'countDebtors',
      type: 'numeric',
      columns: ['Должников'],
    },
    {
      name: 'countCritical',
      type: 'numeric',
      columns: ['Более 2 долгов'],
    },
  ],
};
