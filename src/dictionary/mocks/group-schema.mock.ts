import { Schema } from '../../grabber/interfaces/schema.interface';

export const GROUP_SCHEMA: Schema = {
  attributes: [
    {
      name: 'id',
      type: 'id',
      columns: ['Группа'],
    },
    {
      name: 'name',
      type: 'text',
      columns: ['Группа'],
    },
    {
      name: 'year',
      type: 'numeric',
      columns: ['Курс'],
    },
    {
      name: 'specialityId',
      type: 'id',
      columns: ['Специальность'],
    },
    {
      name: 'speciality',
      type: 'text',
      columns: ['Специальность'],
    },
    {
      name: 'countAll',
      type: 'numeric',
      columns: ['Всего'],
    },
    {
      name: 'countCommon',
      type: 'numeric',
      columns: ['ОО'],
    },
    {
      name: 'countTargeted',
      type: 'numeric',
      columns: ['ЦН'],
    },
    {
      name: 'countSpecial',
      type: 'numeric',
      columns: ['СН'],
    },
    {
      name: 'curricula',
      type: 'text',
      columns: ['Учебный План'],
    },
  ],
};
