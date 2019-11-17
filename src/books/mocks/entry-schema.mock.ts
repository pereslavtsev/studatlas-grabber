import { Schema } from '../../grabber/interfaces/schema.interface';

export const ENTRY_SCHEMA: Schema = {
  attributes: [
    {
      name: 'semester',
      type: 'numeric',
      columns: ['Семестр'],
    },
    {
      name: 'subject',
      type: 'text',
      columns: ['Дисциплина'],
    },
    {
      name: 'id',
      type: 'id',
      columns: ['Дисциплина'],
    },
    {
      name: 'mark',
      type: 'text',
      columns: ['Оценка'],
    },
    {
      name: 'hours',
      type: 'numeric',
      columns: ['Часов'],
    },
    {
      name: 'teacher',
      type: 'text',
      columns: ['Преподаватель'],
    },
    {
      name: 'unit',
      type: 'text',
      columns: ['Блок'],
    },
    {
      name: 'type',
      type: 'text',
      columns: ['Тип'],
    },
  ],
};
