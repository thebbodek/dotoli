import { HTMLAttributes } from 'react';

import { FAQ_ACCORDION_OPEN_MODES } from '@/components/FaqAccordion/constants';

export type FaqAccordionOpenMode =
  (typeof FAQ_ACCORDION_OPEN_MODES)[keyof typeof FAQ_ACCORDION_OPEN_MODES];

export interface FaqAccordionItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqAccordionProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<FaqAccordionItem, 'question' | 'answer'> {
  isOpen: boolean;
  onToggle: () => void;
}

export interface FaqAccordionListProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  items: FaqAccordionItem[];
  openMode?: FaqAccordionOpenMode;
}

export interface ResolveFaqAccordionOpenProps
  extends Required<Pick<FaqAccordionListProps, 'openMode'>> {
  toggledIds: FaqAccordionItem['id'][];
  id: FaqAccordionItem['id'];
}
