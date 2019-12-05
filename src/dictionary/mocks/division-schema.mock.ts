import { Schema } from '../../grabber/interfaces/schema.interface';

export const DIVISION_SCHEMA: Schema = {
  attributes: [
    {
      name: 'id',
      type: 'text',
      columns: ['Номер'],
    },
    {
      name: 'name',
      type: 'text',
      columns: ['Название'],
    },
    {
      name: 'abbreviation',
      type: 'text',
      columns: ['Сокращение'],
    },
    {
      name: 'head',
      type: 'text',
      columns: ['ЗавКафедрой', 'Зав Кафедрой'],
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
