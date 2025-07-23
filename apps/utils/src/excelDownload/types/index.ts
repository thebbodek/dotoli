import { CellObject, WorkBook, WritingOptions } from 'xlsx-js-style';

export type ExcelRowValue = CellObject['v'] | string[];

export type ExcelData = [CellObject[], ...CellObject[][]];

export interface ExcelCellOption {
  value: ExcelRowValue;
  link?: CellObject['l'];
}

export interface ExcelDownloadParams extends Pick<WritingOptions, 'type'> {
  columns: string[];
  rows: ExcelCellOption[][];
  fileNameOption?: { name: string; hasTimestamp?: boolean };
  sheetName?: string;
}

export interface GenerateExcelFileParams
  extends Pick<Required<ExcelDownloadParams>, 'type'> {
  webBook: WorkBook;
  fileName: string;
}

export interface GenerateWorkSheetParams
  extends Pick<ExcelDownloadParams, 'columns' | 'rows'> {}
