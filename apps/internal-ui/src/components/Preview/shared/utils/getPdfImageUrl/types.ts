import { pdfjs } from 'react-pdf';

export type PDFDocumentProxy = Awaited<
  ReturnType<typeof pdfjs.getDocument>['promise']
>;

export interface GetPdfDocParams {
  file: File;
}

export interface GetPreviewPdfImageUrlParams {
  pageNum: number;
  doc: PDFDocumentProxy;
  width: number;
  quality?: number;
  format?: 'image/png' | 'image/jpeg' | 'image/webp';
}
