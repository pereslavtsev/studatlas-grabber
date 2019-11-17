export interface Document {
  id: string;
  groupId: string;
  groupName: string;
  unit: string;
  divisionId: string;
  divisionName: string;
  year: string;
  yearNumber: number;
  teacher: string;
  semester: number;
  hours: number;
  subject: string;
  type: string;
  savesCount: number;
  curricula: string;
  status: string;
  updatedAt: string;
  device: string;
  items: Array<{
    bookId: string;
    bookCode: string;
    date: string;
    mark: string;
  }>;
}
