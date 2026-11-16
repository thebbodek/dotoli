import { TAB_ID_SEGMENTS, TAB_ID_SEPARATOR } from '@/components/Tab/constants';
import { GenerateTabIdProps } from '@/components/Tab/types';

export const generateTabItemId = ({ tabId, value }: GenerateTabIdProps) => {
  return [tabId, TAB_ID_SEGMENTS.ITEM, value].join(TAB_ID_SEPARATOR);
};
