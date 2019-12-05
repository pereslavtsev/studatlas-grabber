import { Schema } from '../../grabber/interfaces/schema.interface';

export const SPECIALITY_SCHEMA: Schema = {
  attributes: [
    {
      name: 'id',
      type: 'id',
      columns: ['Специальность'],
    },
    {
      name: 'shortName',
      type: 'text',
      columns: ['Специальность'],
    },
    {
      name: 'name',
      type: 'text',
      columns: ['Название Специальности', 'Направления/специальности'],
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
      name: 'divisionId',
      type: 'id',
      columns: ['Кафедра'],
    },
    {
      name: 'division',
      type: 'text',
      columns: ['Кафедра'],
    },
    {
      name: 'code',
      type: 'text',
      columns: ['Шифр'],
    },
    {
      name: 'qualification',
      type: 'text',
      columns: ['Квалификация'],
    },
  ],
};
