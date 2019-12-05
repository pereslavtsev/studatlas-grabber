import { Schema } from '../../grabber/interfaces/schema.interface';

export const CURRICULA_SCHEMA: Schema = {
  attributes: [
    {
      name: 'id',
      type: 'id',
      columns: ['Имя плана', 'Веб-версия'],
    },
    {
      name: 'name',
      type: 'text',
      columns: ['Имя плана', 'Веб-версия'],
    },
    {
      name: 'speciality',
      type: 'text',
      columns: ['Специальность'],
    },
  ],
};
