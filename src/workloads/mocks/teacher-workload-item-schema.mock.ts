import { Schema } from '../../grabber/interfaces/schema.interface';

export const TEACHER_WORKLOAD_ITEM_SCHEMA: Schema = {
  attributes: [
    {
      name: 'teacherQuery',
      type: 'id',
      columns: ['Преподаватель'],
    },
    {
      name: 'teacher',
      type: 'text',
      columns: ['Преподаватель'],
    },
  ],
};
