import * as cheerio from 'cheerio';

const WEEKDAYS = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

const rowHasDay = ($, row) => {
  const col1 = $(row)
    .find('td')
    .eq(0)
    .text();
  return !!WEEKDAYS.find(day => day.toLowerCase() === col1.toLowerCase());
};

export const parseGroupTimetable = (data: string) => {
  const $ = cheerio.load(data);

  const entries = $('#tblGr tr')
    .not('[valign=middle]')
    .toArray()
    .map((row, i, rows) => {
      const cols = $(row).find('td');
      const hasDay = rowHasDay($, row);

      let weekday;

      if (!hasDay) {
        const rowWithWeekday = rows
          .slice(0, i)
          .reverse()
          .find(prevRow => rowHasDay($, prevRow));
        weekday = $(rowWithWeekday)
          .find('td')
          .eq(0)
          .text();
      } else {
        weekday = cols.eq(0).text();
      }

      let time;

      const hasTime = !(cols.eq(hasDay ? 1 : 0).text().length === 1);

      if (weekday === 'Понедельник') {
          rows
            .slice(0, i)
            .map(s => console.log(1, $(s).text()))
      }

      if (!hasTime) {
        const rowWithTime = rows
          .slice(1, i)
          .reverse()
          .find(prevRow => {
            const prevHasDay = rowHasDay($, prevRow);
            if (weekday === 'Понедельник') {
              console.log(
                $(prevRow).text(),
                { prevHasDay },
                !(cols.eq(prevHasDay ? 1 : 0).text().length === 1),
              );
            }
            return !(cols.eq(prevHasDay ? 1 : 0).text().length === 1);
          });
        const rowWithTimeCols = $(rowWithTime).find('td');
        const rowWithTimeHasDay = !!WEEKDAYS.find(
          day =>
            day.toLowerCase() ===
            rowWithTimeCols
              .eq(0)
              .text()
              .toLowerCase(),
        );
        time = rowWithTimeCols
          .eq(rowWithTimeHasDay ? 1 : 0)
          .text()
          .match(/.{1,5}/g);
      } else {
        time = cols
          .eq(hasDay ? 1 : 0)
          .text()
          .match(/.{1,5}/g);
      }

      // console.log(hasDay);
      return {
        weekday,
        time,
      };
    });
  console.log(entries);
};
