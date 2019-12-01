import { Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { getBorderCharacters, table } from 'table';
import { Schema } from '../../grabber/interfaces/schema.interface';

export class CustomLogger extends Logger {
  table(message: string = '', schema: Schema, entries: object[]) {
    const config = {
      border: getBorderCharacters('norc'),
      columnCount: schema.attributes.length,
      columns: {
        ...schema.attributes.map(a => {
          switch (a.type) {
            case 'id':
            case 'numeric': {
              return {
                alignment: 'right',
              };
            }
            case 'text':
            default: {
              return a.name === 'name'
                ? {
                    width: 30,
                    wrapWord: true,
                  }
                : {};
            }
          }
        }),
      },
    };
    const data = entries.map(entry => _.values(entry));
    // @ts-ignore
    const output = table([schema.attributes.map(a => a.name), ...data], config);
    super.debug(`${message}\n${output}`);
  }
}
