import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import {
  ORDER_NOTI_COLLAPSE_BASE_STYLE,
  ORDER_NOTI_COLLAPSE_CARET_STYLE,
  ORDER_NOTI_COLLAPSE_CARET_WRAPPER_STYLE,
  ORDER_NOTI_COLLAPSE_HEADING_STYLE,
  ORDER_NOTI_COLLAPSE_ICON_KEY,
  ORDER_NOTI_COLLAPSE_ICON_WEIGHT,
  ORDER_NOTI_COLLAPSE_LABELS,
  ORDER_NOTI_COLLAPSE_OPEN_CARET_STYLE,
  ORDER_NOTI_COLLAPSE_STYLES,
  ORDER_NOTI_COLLAPSE_TEXT_STYLE,
  ORDER_NOTI_COLLAPSE_TRAILING_STYLE,
} from '@/components/Order/OrderNotiCollapse/constants';
import { OrderNotiCollapseProps } from '@/components/Order/OrderNotiCollapse/types';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const OrderNotiCollapse = ({
  type,
  registeredAtLabel,
  registrant,
  isOpen,
  className,
  onClick,
  ref,
  'aria-controls': ariaControls,
}: OrderNotiCollapseProps) => {
  const { CONTAINER, LABEL } = ORDER_NOTI_COLLAPSE_STYLES[type];

  return (
    <button
      aria-controls={ariaControls}
      aria-expanded={isOpen}
      className={clsx(className, ORDER_NOTI_COLLAPSE_BASE_STYLE, CONTAINER)}
      ref={ref}
      type='button'
      onClick={onClick}
    >
      <span className={ORDER_NOTI_COLLAPSE_HEADING_STYLE}>
        <Typography
          className={ORDER_NOTI_COLLAPSE_TEXT_STYLE}
          color={LABEL}
          variant={TYPOGRAPHY_VARIANTS.LABEL_BOLD}
        >
          {ORDER_NOTI_COLLAPSE_LABELS[type]}
        </Typography>
        <Typography
          className={ORDER_NOTI_COLLAPSE_TEXT_STYLE}
          color={COLOR_VARIANTS.GRAY_600}
          variant={TYPOGRAPHY_VARIANTS.LABEL}
        >
          {registeredAtLabel}
        </Typography>
      </span>
      <span className={ORDER_NOTI_COLLAPSE_TRAILING_STYLE}>
        <Typography
          color={COLOR_VARIANTS.GRAY_600}
          variant={TYPOGRAPHY_VARIANTS.LABEL}
        >
          {registrant}
        </Typography>
        <span className={ORDER_NOTI_COLLAPSE_CARET_WRAPPER_STYLE}>
          <Icon
            className={clsx(
              ORDER_NOTI_COLLAPSE_CARET_STYLE,
              isOpen && ORDER_NOTI_COLLAPSE_OPEN_CARET_STYLE,
            )}
            iconKey={ORDER_NOTI_COLLAPSE_ICON_KEY}
            weight={ORDER_NOTI_COLLAPSE_ICON_WEIGHT}
            aria-hidden
          />
        </span>
      </span>
    </button>
  );
};

export default OrderNotiCollapse;
