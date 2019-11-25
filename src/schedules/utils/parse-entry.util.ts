import * as entities from 'entities';
import * as _ from 'lodash';
import { extractId } from '../../grabber/utils/extract-id.util';

export const parseEntry = ($: CheerioStatic) => (index: number, element: CheerioElement) => {
  const rows = $(element).find('td');
  const order = rows.eq(0).text();
  const subject = rows.eq(1).text();
  const controlType = rows.eq(2).text();
  const unit = rows.eq(3).text();
  const hours = rows.eq(4).text();
  const credits = rows
    .eq(5)
    .html()
    .split('<br>')
    .map(credit => entities.decodeHTML(credit))
    .filter(credit => !_.isEmpty(credit));
  const exams = rows
    .eq(6)
    .html()
    .split('<br>')
    .map(exam => entities.decodeHTML(exam))
    .filter(exam => !_.isEmpty(exam));
  const teachers = rows
    .eq(7)
    .html()
    .split('<br>')
    .map(teacher => entities.decodeHTML(teacher))
    .filter(teacher => !_.isEmpty(teacher));
  const division = rows
    .eq(8)
    .find('a')
    .text();
  const documentValue = rows
    .eq(1)
    .find('a')
    .attr('href');
  const divisionValue = rows
    .eq(8)
    .find('a')
    .attr('href');
  const documentId = extractId(documentValue);
  const divisionId = extractId(divisionValue);
  return {
    order,
    subject,
    documentId,
    controlType,
    unit,
    hours,
    credits,
    exams,
    teachers,
    division,
    divisionId,
  };
};
