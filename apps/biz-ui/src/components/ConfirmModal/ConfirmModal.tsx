import clsx from 'clsx';
import { useId } from 'react';

import {
  CTA_BUTTON_SIZES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
  CtaButton,
} from '@/components/Button';
import {
  CONFIRM_MODAL_ACTIONS_STYLE,
  CONFIRM_MODAL_BASE_STYLE,
  CONFIRM_MODAL_BUTTON_STYLE,
  CONFIRM_MODAL_DEFAULT_TITLE_ELEMENT,
  CONFIRM_MODAL_TEXT_STYLE,
} from '@/components/ConfirmModal/constants';
import { ConfirmModalProps } from '@/components/ConfirmModal/types';
import { Overlay, OVERLAY_VARIANTS } from '@/components/shared';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const ConfirmModal = ({
  isOpen,
  title,
  titleAs = CONFIRM_MODAL_DEFAULT_TITLE_ELEMENT,
  description,
  confirm,
  cancel,
  target,
  className,
  onClose,
}: ConfirmModalProps) => {
  const titleId = useId();

  return (
    <Overlay
      aria-labelledby={titleId}
      contentClassName={clsx(className, CONFIRM_MODAL_BASE_STYLE)}
      isOpen={isOpen}
      target={target}
      variant={OVERLAY_VARIANTS.MODAL}
      onClose={onClose}
    >
      <div className={CONFIRM_MODAL_TEXT_STYLE}>
        <Typography
          as={titleAs}
          color={COLOR_VARIANTS.GRAY_900}
          id={titleId}
          variant={TYPOGRAPHY_VARIANTS.HEADING_3_BOLD}
        >
          {title}
        </Typography>
        <Typography
          color={COLOR_VARIANTS.GRAY_700}
          variant={TYPOGRAPHY_VARIANTS.BODY}
        >
          {description}
        </Typography>
      </div>
      <div className={CONFIRM_MODAL_ACTIONS_STYLE}>
        {!!cancel && (
          <CtaButton
            className={CONFIRM_MODAL_BUTTON_STYLE}
            label={cancel.label}
            size={CTA_BUTTON_SIZES.LG}
            theme={CTA_BUTTON_THEMES.GRAY}
            variant={CTA_BUTTON_VARIANTS.TONAL}
            onClick={cancel.onClick}
          />
        )}
        <CtaButton
          className={CONFIRM_MODAL_BUTTON_STYLE}
          label={confirm.label}
          size={CTA_BUTTON_SIZES.LG}
          theme={CTA_BUTTON_THEMES.PRIMARY}
          variant={CTA_BUTTON_VARIANTS.FILLED}
          onClick={confirm.onClick}
        />
      </div>
    </Overlay>
  );
};

export default ConfirmModal;
