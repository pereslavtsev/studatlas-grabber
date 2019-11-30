import { extractId } from '../../grabber/utils/extract-id.util';
import { parseReportAssessment } from './parse-report-assessment.util';

export const parseReportEntry = ($: CheerioStatic, subjectsCount: number) => (
  i: number,
  element: CheerioElement,
) => {
  const rows = $(element).find('td');
  const book = rows.eq(0).text();
  const bookId = extractId(
    rows
      .eq(0)
      .find('a')
      .attr('href'),
  );
  const authority = rows.eq(1).text();
  const assessments = rows
    .slice(2, subjectsCount)
    .map(parseReportAssessment($))
    .toArray();
  // tslint:disable-next-line:radix
  const countDebts = parseInt(rows.eq(subjectsCount + 2).text());
  return {
    book,
    bookId,
    authority,
    assessments,
    countDebts,
  };
};
