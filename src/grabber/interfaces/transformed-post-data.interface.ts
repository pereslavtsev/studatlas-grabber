import {
  EVENT_VALIDATION,
  VIEW_STATE,
  VIEW_STATE_GENERATOR,
} from '../constants/params.constants';
import { PostData } from './post-data.interface';

export interface TransformedPostData extends PostData {
  [EVENT_VALIDATION]: string;
  [VIEW_STATE]: string;
  [VIEW_STATE_GENERATOR]: string;
}
