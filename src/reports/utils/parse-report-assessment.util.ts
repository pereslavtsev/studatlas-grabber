export const parseReportAssessment = ($: CheerioStatic) => (i: number, element: CheerioElement) => {
  return {
    subject: i,
    isDebt: $(element).hasClass('Dolg'),
    value: $(element)
      .text()
      .trim(),
  };
};
