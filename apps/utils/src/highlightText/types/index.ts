import { TypographyProps } from '@bbodek/internal-ui';

export interface HighlightTextParams {
  text: string;
  targetText: string;
  highlightOptions?: Pick<TypographyProps, 'className' | 'color'>;
}
