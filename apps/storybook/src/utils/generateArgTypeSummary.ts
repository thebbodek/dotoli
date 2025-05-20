import { GenerateArgTypeSummaryParams } from '@/types/GenerateArgTypeSummary';

export const generateArgTypeSummary = ({
  options,
}: GenerateArgTypeSummaryParams) =>
  options
    .map((option) => (typeof option === 'number' ? option : `'${option}'`))
    .join(' | ');
