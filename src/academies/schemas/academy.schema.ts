import * as mongoose from 'mongoose';
import { AcademyVersion } from '../enums/academy-version.enum';

export const AcademySchema = new mongoose.Schema({
  name: String,
  alias: String,
  abbreviation: String,
  website: String,
  endpoint: String,
  version: {
    type: String,
    default: AcademyVersion.Modern,
  },
  disabledSources: [String],
  isDisabled: {
    type: Boolean,
    default: false,
  },
});
