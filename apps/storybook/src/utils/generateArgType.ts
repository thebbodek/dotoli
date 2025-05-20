import { GenerateArgTypeParams } from '@/types/GenerateArgType';

export const generateArgTypeSummary = ({ options }: GenerateArgTypeParams) =>
  options
    .map((option) => (typeof option === 'number' ? option : `'${option}'`))
    .join(' | ');
