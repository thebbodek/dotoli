import { ExcelDataType } from 'xlsx-js-style';

export const EXCEL_BUFFER_FILE_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const EXCEL_CELL_HEIGHT = 20;

export const EXCEL_CELL_WIDTH = 20;

export const EXCEL_CELL_TYPE: Record<string, ExcelDataType> = {
  STRING: 's',
  EMPTY: 'z',
};
