export interface Schema {
  attributes: Array<{
    name: string;
    columns: string[];
    type: 'id' | 'text' | 'numeric';
  }>;
}
