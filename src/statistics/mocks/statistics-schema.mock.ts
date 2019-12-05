import { Schema } from '../../grabber/interfaces/schema.interface';

export const STATISTICS_SCHEMA: Schema = {
  attributes: [
    {
      name: 'divisionId',
      type: 'numeric',
      columns: ['Номер'],
    },
    {
      name: 'division',
      type: 'text',
      columns: ['Название Кафедры', 'Название'],
    },
    {
      name: 'facultyId',
      type: 'id',
      columns: ['Факультет'],
    },
    {
      name: 'faculty',
      type: 'text',
      columns: ['Факультет'],
    },
    {
      name: 'all',
      type: 'numeric',
      columns: ['Всего Ведомостей'],
    },
    {
      name: 'noCheckpoints',
      type: 'numeric',
      columns: ['Не заполнена КТ', 'Не заполнена вовремя КТ'],
    },
    {
      name: 'noRatings',
      type: 'numeric',
      columns: ['Не заполнен Рейтинг', 'Не заполнен вовремя рейтинг'],
    },
    {
      name: 'notClosed',
      type: 'numeric',
      columns: ['Не закрыто', 'Не закрыты вовремя'],
    },
    {
      name: 'blank',
      type: 'numeric',
      columns: ['Пустых'],
    },
  ],
};
