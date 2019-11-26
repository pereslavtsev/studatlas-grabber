import * as cheerio from 'cheerio';
import { parseReportEntry } from './parse-report-entry.util';
import { parseReportSubject } from './parse-report-subject.util';

export const parseReport = (data: string) => {
  const $ = cheerio.load(data);
  const grid = $('#Grid');
  const subjectsFlags = grid
    .find('.TitleVedInf')
    .eq(0)
    .find('td')
    .slice(2, 2 + grid.find('.DisName').toArray().length)
    .toArray();
  const subjects = grid
    .find('.DisName')
    .map(parseReportSubject($, subjectsFlags))
    .toArray();
  const entries = grid
    .find('.TitleVedInf')
    .slice(2) // ФИО и пустая строка
    .map(parseReportEntry($, subjects.length))
    .toArray();
  const countAll = grid
    .find('tr')
    .not('.TitleVedInf')
    .eq(1)
    .find('td')
    .eq(0)
    .text()
    .match(/\d+/)
    .pop();
  return {
    countAll,
    subjects,
    entries,
  };
};
