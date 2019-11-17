import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import * as queryString from 'query-string';
import { Schema } from '../interfaces/schema.interface';

export class DataGrid {
  private readonly $: CheerioStatic;
  private root: Cheerio;
  private headers: Cheerio;
  private rows: Cheerio;

  protected static selectors = {
    headers: ['.TblHead td', '.TblHead th', 'tr[id*="DXHeaders"] td table td'],
    rows: ['.TblText', '.TblhiText', 'tr[id*="DXDataRow"]'],
  };

  constructor(selectors: string, html: string) {
    this.$ = cheerio.load(html);
    this.root = this.$(selectors);
    this.headers = this.$(this.root).find(
      DataGrid.selectors.headers.join(', '),
    );
    this.rows = this.$(this.root).find(DataGrid.selectors.rows.join(', '));
  }

  public extract(schema: Schema): any[] {
    const positions = {};
    schema.attributes.map(attribute => {
      positions[attribute.name] = this.headers
        .toArray()
        // удаляет пустые ячейки в заголовке таблицы (для новой версии)
        .filter(header => {
          const headerText = this.$(header)
            .text()
            .trim();
          return !!headerText.length;
        })
        // ищет колонку где искать аттрибут и возвращает ее индекс
        .findIndex((header: any) => {
          const headerText = this.$(header)
            .text()
            .trim();
          // @ts-ignore
          return !!attribute.columns.find(
            h => h.toLowerCase() === headerText.toLowerCase(),
          );
        });
    });

    const props = schema.attributes.map(attr => attr.name);

    return this.rows
      .map((i, row) => {
        const entity = {};
        const cells = this.$(row)
          .find('td')
          .toArray();

        schema.attributes.map(({ name, type }) => {
          let value;
          const elem = this.$(cells[positions[name]]);

          switch (type) {
            case 'id': {
              const stringified = elem.find('a').attr('href');
              const parsed = queryString.parse(stringified);
              value =
                parsed.id || parsed['Ved.aspx?id'] || parsed['Totals.aspx?group'];
              break;
            }
            case 'numeric': {
              const numVal = elem.text().trim();
              value = !!numVal.length ? Number(numVal) : undefined;
              break;
            }
            case 'text':
            default: {
              const text = elem.text().trim();
              value = !!text.length ? text : undefined;
            }
          }
          entity[name] = value;
        });
        return entity;
      })
      .toArray()
      .map(entity => _.pick(entity, props));
  }
}
