import { HTMLAttributes } from 'react';

import { TAB_PANEL_ID_SUFFIX } from '@/components/Tab/constants';

export const getPanelId = ({
  id,
}: Pick<HTMLAttributes<HTMLButtonElement>, 'id'>) => {
  return id && `${id}${TAB_PANEL_ID_SUFFIX}`;
};
