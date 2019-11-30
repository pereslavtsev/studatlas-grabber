export const parseReportSubject = ($: CheerioStatic, subjectsFlags: CheerioElement[]) => (
  i: number,
  element: CheerioElement,
) => {
  const name = $(element)
    .text()
    .trim();
  const flag = $(subjectsFlags)
    .eq(i)
    .text()
    .trim();
  return {
    order: i,
    name,
    flag,
  };
};
