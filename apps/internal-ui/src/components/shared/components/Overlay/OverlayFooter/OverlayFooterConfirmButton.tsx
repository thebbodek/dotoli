import {
  Button,
  BUTTON_ICON_POSITIONS,
  ButtonProps,
} from '@/components/Button';
import { OVERLAY_CONFIRM_TOOLTIP_GAP } from '@/components/shared/components/Overlay/constants';
import { OverlayFooterProps } from '@/components/shared/components/Overlay/OverlayFooter/types';
import { Tooltip } from '@/components/Tooltip';

const OverlayFooterConfirmButton = ({
  size,
  confirmOption,
  possibleConfirm,
  isLoading,
  isPending,
  className,
}: Pick<
  OverlayFooterProps,
  'confirmOption' | 'possibleConfirm' | 'isLoading' | 'isPending'
> &
  Pick<ButtonProps, 'className' | 'size'>) => {
  const { label: confirmLabel, onConfirm, tooltipOption } = confirmOption;
  const {
    useTooltip = !possibleConfirm && !isPending && !isLoading,
    content = '필수 항목을 모두 입력해주세요',
  } = tooltipOption ?? {};

  return (
    <Tooltip
      content={content}
      gap={OVERLAY_CONFIRM_TOOLTIP_GAP}
      hidden={!useTooltip}
      rootClassName={className}
    >
      <Button
        className='w-full'
        disabled={!possibleConfirm || isPending || isLoading}
        iconPosition={BUTTON_ICON_POSITIONS.RIGHT}
        isPending={isPending}
        label={confirmLabel}
        size={size}
        onClick={onConfirm}
      />
    </Tooltip>
  );
};

export default OverlayFooterConfirmButton;
