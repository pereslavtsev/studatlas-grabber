import { Schema } from '../../grabber/interfaces/schema.interface';

export const TEACHER_DEBTORS_STATISTICS_SCHEMA: Schema = {
  attributes: [
    {
      name: 'division',
      type: 'text',
      columns: ['Кафедра'],
    },
    {
      name: 'subject',
      type: 'text',
      columns: ['Дисциплина'],
    },
    {
      name: 'year',
      type: 'numeric',
      columns: ['Курс'],
    },
    {
      name: 'teacher',
      type: 'text',
      columns: ['Преподаватель'],
    },
    {
      name: 'countDebtors',
      type: 'numeric',
      columns: ['Должников'],
    },
  ],
};
