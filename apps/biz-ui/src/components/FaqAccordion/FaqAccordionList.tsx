import clsx from 'clsx';
import { useState } from 'react';

import {
  FAQ_ACCORDION_LIST_BASE_STYLE,
  FAQ_ACCORDION_OPEN_MODES,
} from '@/components/FaqAccordion/constants';
import FaqAccordion from '@/components/FaqAccordion/FaqAccordion';
import {
  FaqAccordionItem,
  FaqAccordionListProps,
} from '@/components/FaqAccordion/types';
import {
  resolveFaqAccordionIsOpen,
  resolveFaqAccordionToggledIds,
} from '@/components/FaqAccordion/utils';

const FaqAccordionList = ({
  items,
  openMode = FAQ_ACCORDION_OPEN_MODES.SINGLE,
  className,
}: FaqAccordionListProps) => {
  const [toggledIds, setToggledIds] = useState<FaqAccordionItem['id'][]>([]);

  const handleToggle = (id: FaqAccordionItem['id']) =>
    setToggledIds((prev) =>
      resolveFaqAccordionToggledIds({ toggledIds: prev, id, openMode }),
    );

  return (
    <div className={clsx(className, FAQ_ACCORDION_LIST_BASE_STYLE)}>
      {items.map(({ id, question, answer }) => (
        <FaqAccordion
          answer={answer}
          isOpen={resolveFaqAccordionIsOpen({ toggledIds, id, openMode })}
          key={id}
          question={question}
          onToggle={() => handleToggle(id)}
        />
      ))}
    </div>
  );
};

export default FaqAccordionList;
