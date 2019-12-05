import * as params from '../constants/params.constants';
import { PostData } from './post-data.interface';

export interface TransformedPostData extends PostData {
  [params.EVENT_VALIDATION]: string;
  [params.VIEW_STATE]: string;
  [params.VIEW_STATE_GENERATOR]: string;
  [params.CALLBACK_ID]?: string;
  [params.CALLBACK_PARAM]?: string;
}
