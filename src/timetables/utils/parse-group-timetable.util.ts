import * as cheerio from 'cheerio';

export const parseGroupTimetable = (data: string) => {
  const $ = cheerio.load(data);

  const entries = $('#tblGr tr')
    .not('[valign=middle]')
    .toArray()
    .map(row => {
      return $(row)
        .find('td')
        .toArray()
        .map(col => $(col).text());
    })
    .map((row, i, rows) => {
      if (row.length === 4) {
        const [weekday] = rows
          .slice(0, i)
          .reverse()
          .find(prevRow => {
            return prevRow.length === 6;
          });
        const [time] = rows
          // .slice(0, i)
          // .reverse()
          .find(prevRow => {
            return prevRow.length === 5;
          });
        return [weekday, 1, ...row];
      }
      if (row.length === 5) {
        const [time] = rows
          // .slice(0, i)
          // .reverse()
          .find(prevRow => {
            return prevRow.length === 5;
          });
        return [time, ...row];
      }
      return row;
    });
  console.log(entries);
};
