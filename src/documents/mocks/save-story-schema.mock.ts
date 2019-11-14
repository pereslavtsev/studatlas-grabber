import { Schema } from '../../grabber/interfaces/schema.interface';

export const SAVE_STORY_SCHEMA: Schema = {
  attributes: [
    {
      name: 'date',
      type: 'text',
      columns: ['Дата'],
    },
    {
      name: 'login',
      type: 'text',
      columns: ['Пользователь'],
    },
    {
      name: 'username',
      type: 'text',
      columns: ['ФИО'],
    },
    {
      name: 'post',
      type: 'text',
      columns: ['Должность'],
    },
    {
      name: 'device',
      type: 'text',
      columns: ['Компьютер'],
    },
  ],
};
