import * as mongoose from 'mongoose';

export const AcademySchema = new mongoose.Schema({
  name: String,
  alias: String,
  abbreviation: String,
  website: String,
  endpoint: String,
  version: {
    type: String,
    default: 'modern',
  },
});
