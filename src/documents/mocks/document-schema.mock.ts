import { Schema } from '../../grabber/interfaces/schema.interface';

export const DOCUMENT_HEADER_SCHEMA: Schema = {
  attributes: [
    {
      name: 'id',
      columns: ['Кол-во Сохранений'],
      type: 'id',
    },
    {
      name: 'groupId',
      columns: ['Группа'],
      type: 'id',
    },
    {
      name: 'groupName',
      columns: ['Группа'],
      type: 'text',
    },
    {
      name: 'unit',
      columns: ['Блок'],
      type: 'text',
    },
    {
      name: 'divisionId',
      columns: ['Кафедра'],
      type: 'id',
    },
    {
      name: 'divisionName',
      columns: ['Кафедра'],
      type: 'text',
    },
    {
      name: 'year',
      columns: ['Год контроля'],
      type: 'text',
    },
    {
      name: 'yearNumber',
      columns: ['Курс'],
      type: 'numeric',
    },
    {
      name: 'teacher',
      columns: ['Преподаватель'],
      type: 'text',
    },
    {
      name: 'semester',
      columns: ['Семестр'],
      type: 'numeric',
    },
    {
      name: 'hours',
      columns: ['Часов'],
      type: 'numeric',
    },
    {
      name: 'subject',
      columns: ['Дисциплина'],
      type: 'text',
    },
    {
      name: 'type',
      columns: ['Тип Ведомости'],
      type: 'text',
    },
    {
      name: 'savesCount',
      columns: ['Кол-во Сохранений'],
      type: 'numeric',
    },
    {
      name: 'curricula',
      columns: ['Учебный План'],
      type: 'text',
    },
    {
      name: 'status',
      columns: ['Статус'],
      type: 'text',
    },
    {
      name: 'updatedAt',
      columns: ['Дата Изменения'],
      type: 'text',
    },
    {
      name: 'device',
      columns: ['Компьютер'],
      type: 'text',
    },
  ],
};

export const DOCUMENTS_MEMBERS_SCHEMA: Schema = {
  attributes: [
    {
      name: 'bookId',
      type: 'id',
      columns: ['ФИО'],
    },
    {
      name: 'bookCode',
      type: 'text',
      columns: ['Номер зачетной книжки'],
    },
    {
      name: 'date',
      type: 'text',
      columns: ['Дата сдачи'],
    },
    {
      name: 'mark',
      type: 'text',
      columns: ['Оценка'],
    },
  ],
};
