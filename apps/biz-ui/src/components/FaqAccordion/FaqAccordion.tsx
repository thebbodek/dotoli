import clsx from 'clsx';
import { useId } from 'react';

import {
  FAQ_ACCORDION_ANSWER_CLIP_STYLE,
  FAQ_ACCORDION_ANSWER_GRID_STYLE,
  FAQ_ACCORDION_ANSWER_STYLE,
  FAQ_ACCORDION_ANSWER_WRAPPER_STYLE,
  FAQ_ACCORDION_BASE_STYLE,
  FAQ_ACCORDION_CARET_STYLE,
  FAQ_ACCORDION_CARET_WRAPPER_STYLE,
  FAQ_ACCORDION_CLOSED_ANSWER_GRID_STYLE,
  FAQ_ACCORDION_ICON_KEY,
  FAQ_ACCORDION_ICON_WEIGHT,
  FAQ_ACCORDION_OPEN_ANSWER_GRID_STYLE,
  FAQ_ACCORDION_OPEN_CARET_STYLE,
  FAQ_ACCORDION_QUESTION_STYLE,
  FAQ_ACCORDION_QUESTION_TEXT_STYLE,
} from '@/components/FaqAccordion/constants';
import { FaqAccordionProps } from '@/components/FaqAccordion/types';
import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const FaqAccordion = ({
  question,
  answer,
  isOpen,
  className,
  onToggle,
}: FaqAccordionProps) => {
  const answerId = useId();

  return (
    <div className={clsx(className, FAQ_ACCORDION_BASE_STYLE)}>
      <button
        aria-controls={answerId}
        aria-expanded={isOpen}
        className={FAQ_ACCORDION_QUESTION_STYLE}
        type='button'
        onClick={onToggle}
      >
        <Typography
          className={FAQ_ACCORDION_QUESTION_TEXT_STYLE}
          color={COLOR_VARIANTS.GRAY_800}
          variant={TYPOGRAPHY_VARIANTS.BODY_LG}
        >
          {question}
        </Typography>
        <span className={FAQ_ACCORDION_CARET_WRAPPER_STYLE}>
          <Icon
            className={clsx(
              FAQ_ACCORDION_CARET_STYLE,
              isOpen && FAQ_ACCORDION_OPEN_CARET_STYLE,
            )}
            iconKey={FAQ_ACCORDION_ICON_KEY}
            weight={FAQ_ACCORDION_ICON_WEIGHT}
            aria-hidden
          />
        </span>
      </button>
      <div
        className={clsx(
          FAQ_ACCORDION_ANSWER_GRID_STYLE,
          isOpen
            ? FAQ_ACCORDION_OPEN_ANSWER_GRID_STYLE
            : FAQ_ACCORDION_CLOSED_ANSWER_GRID_STYLE,
        )}
        aria-hidden={!isOpen}
        id={answerId}
      >
        <div className={FAQ_ACCORDION_ANSWER_CLIP_STYLE}>
          <div className={FAQ_ACCORDION_ANSWER_WRAPPER_STYLE}>
            <div className={FAQ_ACCORDION_ANSWER_STYLE}>
              <Typography
                color={COLOR_VARIANTS.GRAY_700}
                variant={TYPOGRAPHY_VARIANTS.BODY}
              >
                {answer}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;
