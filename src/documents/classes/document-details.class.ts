import * as cheerio from 'cheerio';
import * as queryString from 'query-string';
import {
  DOCUMENT_HEADER_SCHEMA,
  DOCUMENTS_MEMBERS_SCHEMA,
} from '../mocks/document-schema.mock';

export class DocumentDetails {
  private readonly $: CheerioStatic;
  private headers: string[];
  private readonly values: CheerioElement[];

  constructor(data: string) {
    this.$ = cheerio.load(data);
    const headerCells = this.$('#tblTitle')
      .find('tr')
      .not('.TitleVedName')
      .find('td')
      .toArray();

    this.headers = headerCells
      .filter((cell, i) => i % 2 === 0)
      .map(header =>
        this.$(header)
          .text()
          .trim(),
      );

    this.values = headerCells.filter((cell, i) => i % 2 !== 0);
  }

  extractMembers() {
    const membersRoot = this.$('#ucVedBox_tblVed');
    const membersHeaders = this.$(membersRoot)
      .find('#ucVedBox_Row1 td')
      .toArray()
      .map(header =>
        this.$(header)
          .text()
          .trim(),
      )
      .filter(header => !!header.length);

    const membersPositions = {};
    DOCUMENTS_MEMBERS_SCHEMA.attributes.map(({ name, columns }) => {
      membersPositions[name] = membersHeaders
        // ищет колонку где искать аттрибут и возвращает ее индекс
        .findIndex(header => {
          return columns.includes(header);
        });
    });

    return this.$(membersRoot)
      .find('.VedRow1')
      .toArray()
      .map(row => {
        const cells = this.$(row)
          .find('td')
          .toArray();
        const member = {};
        DOCUMENTS_MEMBERS_SCHEMA.attributes.map(({ name, type }) => {
          const cell = this.$(cells[membersPositions[name]]);
          let value;
          switch (type) {
            case 'id': {
              const stringified = cell.find('a').attr('href');
              const parsed = queryString.parse(stringified, {
                parseNumbers: true,
              });
              value = parsed.id || parsed['Ved.aspx?id'];
              break;
            }
            case 'text':
            default: {
              value = cell.text().trim();
              break;
            }
          }
          member[name] = value;
        });
        return member;
      });
  }

  extractDetails() {
    const headersPositions = {};

    DOCUMENT_HEADER_SCHEMA.attributes.map(({ name, columns }) => {
      headersPositions[name] = this.headers
        // ищет колонку где искать аттрибут и возвращает ее индекс
        .findIndex(header => {
          return columns.includes(header);
        });
    });

    const entity = {};

    DOCUMENT_HEADER_SCHEMA.attributes.map(({ name, type }) => {
      const cell = this.$(this.values[headersPositions[name]]);
      let entityValue;

      switch (type) {
        case 'id': {
          const stringified = cell
            .find('a')
            .attr('href')
            .split('?', 2)
            .pop();
          const parsed = queryString.parse(stringified, {
            parseNumbers: true,
          });
          entityValue = parsed.id;
          break;
        }
        case 'numeric': {
          entityValue = Number(cell.text().trim());
          break;
        }
        case 'text':
        default: {
          entityValue = cell.text().trim();
          break;
        }
      }

      entity[name] = entityValue;
    });
    return entity;
  }

  extractAll(): Document {
    const documentDetails = this.extractDetails();
    const items = this.extractMembers();
    return {
      ...documentDetails,
      // @ts-ignore
      items,
    };
  }
}
