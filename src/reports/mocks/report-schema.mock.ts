import { Schema } from '../../grabber/interfaces/schema.interface';

export const REPORT_SCHEMA: Schema = {
  attributes: [
    {
      name: 'id',
      type: 'id',
      columns: ['Группа'],
    },
    {
      name: 'name',
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
      name: 'count',
      type: 'numeric',
      columns: ['Студентов'],
    },
    {
      name: 'curricula',
      type: 'text',
      columns: ['Учебный План'],
    },
  ],
};
