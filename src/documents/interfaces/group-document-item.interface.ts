import { Document } from './document.interface';

export interface GroupDocumentItem extends Pick<Document, 'id' | 'subject' | 'type' | 'status'> {}
