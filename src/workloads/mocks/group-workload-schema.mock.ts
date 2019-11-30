import { Schema } from '../../grabber/interfaces/schema.interface';

export const GROUP_WORKLOAD_SCHEMA: Schema = {
  attributes: [
    {
      name: 'subject',
      type: 'text',
      columns: ['Дисциплина'],
    },
    {
      name: 'session',
      type: 'text',
      columns: ['Сессия'],
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
      name: 'lesionsType',
      type: 'text',
      columns: ['Вид Занятий'],
    },
    {
      name: 'controlsType',
      type: 'text',
      columns: ['Вид Контроля'],
    },
  ],
};
