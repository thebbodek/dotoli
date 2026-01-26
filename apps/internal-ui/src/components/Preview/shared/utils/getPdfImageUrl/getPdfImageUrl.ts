import {
  GetPdfDocParams,
  GetPreviewPdfImageUrlParams,
  PDFDocumentProxy,
} from '@/components/Preview/shared/utils/getPdfImageUrl/types';

export const getPdfDoc = async ({
  file,
}: GetPdfDocParams): Promise<PDFDocumentProxy> => {
  const existingPdfBytes = await file.arrayBuffer();
  const fileArray = new Uint8Array(existingPdfBytes);
  const { pdfjs } = await import('react-pdf');

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const doc = await pdfjs.getDocument({
    data: fileArray,
    useSystemFonts: true,
  }).promise;

  return doc;
};

export const getPdfImageUrl = async ({
  doc,
  pageNum,
  width,
}: GetPreviewPdfImageUrlParams) => {
  const page = await doc.getPage(pageNum);
  const viewport = page.getViewport({ scale: 0.5 });
  const scale = width / viewport.width;
  const sizeViewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') ?? undefined;

  canvas.width = sizeViewport.width;
  canvas.height = sizeViewport.height;

  const task = page.render({
    canvasContext: ctx,
    viewport: sizeViewport,
    canvas,
  }).promise;

  return task
    .then(() => {
      return canvas.toDataURL('image/jpeg');
    })
    .catch((e) => {
      throw e;
    });
};
