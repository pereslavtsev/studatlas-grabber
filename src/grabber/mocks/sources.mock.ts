import { Source } from '../interfaces/source.interface';

export const FILE_EXT = '.aspx';
export const INDEX_PAGE = `Default${FILE_EXT}`;

export const SOURCES: Source[] = [
  {
    id: 'dictionary',
    path: `/Dek/${INDEX_PAGE}`,
  },
  {
    id: 'document',
    path: `/Ved/Ved${FILE_EXT}`,
  },
  {
    id: 'documents',
    path: `/Ved/${INDEX_PAGE}`,
  },
  {
    id: 'save_stories',
    path: `/Ved/StorySave${FILE_EXT}`,
  },
  {
    id: 'books',
    path: `/Ved/ZachBooks${FILE_EXT}`,
  },
  {
    id: 'statistics',
    path: `/Stat/${INDEX_PAGE}`,
  },
  {
    id: 'debtors_statistics',
    path: `/Stat/Debtors${FILE_EXT}`,
  },
  {
    id: 'curricula',
    path: `/Plans/${INDEX_PAGE}`,
  },
  {
    id: 'schedules',
    path: `/Graph/${INDEX_PAGE}`,
  },
  {
    id: 'schedule',
    path: `/Graph/Graph${FILE_EXT}`,
  },
  {
    id: 'timetables',
    path: `/Rasp/${INDEX_PAGE}`,
  },
  {
    id: 'workloads',
    path: `/Nagr/${INDEX_PAGE}`,
  },
  {
    id: 'workload',
    path: `/Nagr/Nagr${FILE_EXT}`,
  },
];
