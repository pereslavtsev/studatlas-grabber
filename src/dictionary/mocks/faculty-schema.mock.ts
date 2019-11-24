import { Schema } from '../../grabber/interfaces/schema.interface';

export const FACULTY_SCHEMA: Schema = {
  attributes: [
    {
      name: 'id',
      type: 'id',
      columns: ['Факультет', 'Институт'], // институт для СПбГЛТУ и КГУ
    },
    {
      name: 'name',
      type: 'text',
      columns: ['Факультет', 'Институт'], // институт для СПбГЛТУ и КГУ
    },
    {
      name: 'abbreviation',
      type: 'text',
      columns: ['Сокращение'],
    },
    {
      name: 'head',
      type: 'text',
      columns: ['Декан'],
    },
    {
      name: 'phone',
      type: 'text',
      columns: ['Телефон'],
    },
    {
      name: 'room',
      type: 'text',
      columns: ['Аудитория'],
    },
  ],
};
