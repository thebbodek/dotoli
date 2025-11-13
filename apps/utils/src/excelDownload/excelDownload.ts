import { utils, WorkBook, write, writeFile } from 'xlsx-js-style';

import { DATE_FORMATS, now, toString } from '../date';
import {
  EXCEL_BUFFER_FILE_TYPE,
  EXCEL_CELL_HEIGHT,
  EXCEL_CELL_TYPE,
  EXCEL_CELL_WIDTH,
} from '@/excelDownload/constants';
import {
  ExcelData,
  ExcelDownloadParams,
  GenerateExcelFileParams,
  GenerateWorkSheetParams,
} from '@/excelDownload/types';
import { ACCEPT_FILE_EXT } from '@/shared';

// NOTE: https://docs.sheetjs.com/docs/

const parseExcelData = ({
  columns,
  rows,
}: Pick<ExcelDownloadParams, 'columns' | 'rows'>): ExcelData => {
  const _columns = columns.map((column) => ({
    v: column,
    t: EXCEL_CELL_TYPE.STRING,
    s: {
      alignment: { vertical: 'center' },
      font: { bold: true, color: { rgb: 'ffffff' } },
      fill: { fgColor: { rgb: '004dc0' } },
    },
  }));

  const _rows = rows.map((row) =>
    row.map(({ value, link }) => ({
      v: Array.isArray(value) ? value.join(', ') : value,
      t: value ? EXCEL_CELL_TYPE.STRING : EXCEL_CELL_TYPE.EMPTY,
      s: {
        alignment: { vertical: 'center' },
        font: {
          color: { rgb: link ? '0579fb' : '000000' },
          underline: !!link,
        },
      },
      l: link,
    })),
  );

  return [_columns, ..._rows];
};

const getFileName = ({
  fileNameOption = { name: 'download', hasTimestamp: true },
}: Pick<ExcelDownloadParams, 'fileNameOption'>) => {
  const { name, hasTimestamp } = fileNameOption;
  const timestamp = toString({
    date: now(),
    format: DATE_FORMATS['YYMMDD_HHmmss'],
  });

  if (!hasTimestamp) return name;

  return `${name}_${timestamp}.${ACCEPT_FILE_EXT.XLSX}`;
};

const generateWorkSheet = ({ columns, rows }: GenerateWorkSheetParams) => {
  const parsedData = parseExcelData({ columns, rows });
  const workSheet = utils.aoa_to_sheet(parsedData);

  workSheet['!cols'] = columns.map(() => ({
    wch: EXCEL_CELL_WIDTH,
    hpx: EXCEL_CELL_HEIGHT,
  }));
  workSheet['!rows'] = rows.map(() => ({ hpx: EXCEL_CELL_HEIGHT }));

  return workSheet;
};

const generateExcelFile = async ({
  webBook,
  type,
  fileName,
}: GenerateExcelFileParams) => {
  const excelBuffer = await write(webBook, { type });
  const excelFile = new File([excelBuffer], fileName, {
    type: EXCEL_BUFFER_FILE_TYPE,
  });

  return excelFile;
};

export const excelDownload = async ({
  columns,
  rows,
  type = 'file',
  sheetName = 'Sheet1',
  fileNameOption,
}: ExcelDownloadParams) => {
  const webBook: WorkBook = utils.book_new();
  const fileName = getFileName({ fileNameOption });
  const workSheet = generateWorkSheet({ columns, rows });
  const isBufferType = type === 'buffer';

  utils.book_append_sheet(webBook, workSheet, sheetName);

  if (isBufferType) {
    return generateExcelFile({ webBook, type, fileName });
  }

  return await writeFile(webBook, fileName, { type });
};
