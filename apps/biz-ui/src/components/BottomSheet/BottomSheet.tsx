import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { BottomActionBar } from '@/components/BottomActionBar';
import {
  BOTTOM_SHEET_BASE_STYLE,
  BOTTOM_SHEET_BODY_STYLE,
  BOTTOM_SHEET_SAFE_AREA_STYLE,
} from '@/components/BottomSheet/constants';
import { BottomSheetProps } from '@/components/BottomSheet/types';
import { HEADER_BAR_TYPES, HeaderBar } from '@/components/HeaderBar';
import { Overlay, OVERLAY_VARIANTS } from '@/components/shared';

const BottomSheet = ({
  isOpen,
  title,
  actionBarOption,
  isDimmed = true,
  target,
  className,
  children,
  onClose,
}: PropsWithChildren<BottomSheetProps>) => {
  return (
    <Overlay
      contentClassName={clsx(
        className,
        BOTTOM_SHEET_BASE_STYLE,
        !actionBarOption && BOTTOM_SHEET_SAFE_AREA_STYLE,
      )}
      aria-label={title}
      isDimmed={isDimmed}
      isOpen={isOpen}
      target={target}
      variant={OVERLAY_VARIANTS.BOTTOM_SHEET}
      onClose={onClose}
    >
      <HeaderBar
        title={title}
        type={HEADER_BAR_TYPES.BOTTOM_SHEET}
        onClose={onClose}
      />
      <div className={BOTTOM_SHEET_BODY_STYLE}>
        {children}
        {!!actionBarOption && <BottomActionBar {...actionBarOption} />}
      </div>
    </Overlay>
  );
};

export default BottomSheet;
