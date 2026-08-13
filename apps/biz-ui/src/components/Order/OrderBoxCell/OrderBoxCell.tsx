import clsx from 'clsx';

import {
  ORDER_BOX_CELL_BASE_STYLE,
  ORDER_BOX_CELL_STYLES,
  ORDER_BOX_CELL_TONES,
} from '@/components/Order/OrderBoxCell/constants';
import { OrderBoxCellProps } from '@/components/Order/OrderBoxCell/types';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const OrderBoxCell = ({
  boxes,
  itemName,
  tone = ORDER_BOX_CELL_TONES.DEFAULT,
  className,
}: OrderBoxCellProps) => {
  const { BOXES, ITEM_NAME } = ORDER_BOX_CELL_STYLES[tone];

  return (
    <div className={clsx(className, ORDER_BOX_CELL_BASE_STYLE)}>
      <Typography
        className='-mb-0.5 w-full'
        color={BOXES}
        variant={TYPOGRAPHY_VARIANTS.BODY_SEMIBOLD}
      >
        {boxes}
      </Typography>
      <Typography
        className='w-full'
        color={ITEM_NAME}
        variant={TYPOGRAPHY_VARIANTS.LABEL}
      >
        {itemName}
      </Typography>
    </div>
  );
};

export default OrderBoxCell;
