import { AcademyVersion } from '../enums/academy-version.enum';

export interface Academy {
  id: string;
  alias: string;
  name: string;
  abbreviation: string;
  website: string;
  endpoint: string;
  version: AcademyVersion;
  disabledSources: string[];
  isDisabled: boolean;
}
