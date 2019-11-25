import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import { parseEntry } from './parse-entry.util';

export const parseSchedule = (data: string) => {
  const $ = cheerio.load(data);
  // year
  const [year] = $('#lblNameDoc')
    .text()
    .match(/\d+/);

  // speciality, profile
  const [, infoStr] = $('#Title tr.TitleVedInf')
    .text()
    .split('Направление ');
  const [speciality, profile] = infoStr.split('Профиль ').map(_.trim);

  // info
  const faculty = $('#lblFacultet').text();
  const group = $('#hypGroup').text();
  const years = $('#lblYear').text();
  const semesterName = $('#lblSem').text();

  const entries = $('.VedRow1, .VedRow2')
    .map(parseEntry($))
    .toArray();

  return {
    faculty,
    group,
    year,
    years,
    semesterName,
    speciality,
    profile: profile.replace(/"/g, ''),
    entries,
  };
};
