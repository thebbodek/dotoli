import { FAQ_ACCORDION_OPEN_MODES } from '@/components/FaqAccordion/constants';
import { ResolveFaqAccordionOpenProps } from '@/components/FaqAccordion/types';

export const resolveFaqAccordionIsOpen = ({
  toggledIds,
  id,
  openMode,
}: ResolveFaqAccordionOpenProps) => {
  const isToggled = toggledIds.includes(id);

  return openMode === FAQ_ACCORDION_OPEN_MODES.ALL ? !isToggled : isToggled;
};
