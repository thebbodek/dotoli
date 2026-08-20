import { FAQ_ACCORDION_OPEN_MODES } from '@/components/FaqAccordion/constants';
import { ResolveFaqAccordionOpenProps } from '@/components/FaqAccordion/types';

export const resolveFaqAccordionToggledIds = ({
  toggledIds,
  id,
  openMode,
}: ResolveFaqAccordionOpenProps) => {
  const isToggled = toggledIds.includes(id);

  if (openMode === FAQ_ACCORDION_OPEN_MODES.SINGLE) {
    return isToggled ? [] : [id];
  }

  return isToggled
    ? toggledIds.filter((toggledId) => toggledId !== id)
    : [...toggledIds, id];
};
