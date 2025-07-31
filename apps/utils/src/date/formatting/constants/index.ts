export const DATE_PARSE_TYPES = {
  DAYJS: 'dayjs',
  UNIX: 'unix',
} as const;

export const DATE_FORMATS = {
  'MM.DD': 'MM. DD',
  'YY.MM.DD.ddd': 'YY. MM. DD (ddd)',
  'YYYY-MM-DD': 'YYYY-MM-DD',
  'YYYY.MM.DD': 'YYYY. MM. DD',
  'YYYY.MM.DD.ddd': 'YYYY. MM. DD (ddd)',
  'YYYY.MM.DD.HH.mm.ss': 'YYYY. MM. DD HH:mm:ss',
  'YYYY년 MM월 DD일': 'YYYY년 MM월 DD일',
  'YY년 MM월 DD일 (ddd)': 'YY년 MM월 DD일 (ddd)',
  'YY년 MM월 DD일 HH시 mm분': 'YY년 MM월 DD일 HH시 mm분',
  YYMMDD_HHmmss: 'YYMMDD_HHmmss',
} as const;
