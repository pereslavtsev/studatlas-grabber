import { Schema } from '../../grabber/interfaces/schema.interface';

export const TEACHER_TIMETABLE_ITEM_SCHEMA: Schema = {
  attributes: [
    {
      name: 'teacher',
      type: 'id', // TODO: param
      columns: ['Преподаватель'],
    },
    {
      name: 'teacherQuery',
      type: 'text',
      columns: ['Преподаватель'],
    },
  ],
};
