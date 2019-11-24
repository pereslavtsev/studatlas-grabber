import { Schema } from '../../grabber/interfaces/schema.interface';

export const ROOM_TIMETABLE_ITEM_SCHEMA: Schema = {
  attributes: [
    {
      name: 'room',
      type: 'id', // TODO: param
      columns: ['Аудитория'],
    },
    {
      name: 'roomQuery',
      type: 'text',
      columns: ['Аудитория'],
    },
  ],
};
