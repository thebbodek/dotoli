import clsx from 'clsx';

import { ORDER_BOX_LIST_BASE_STYLE } from '@/components/Order/OrderBox/constants';
import OrderBoxCell from '@/components/Order/OrderBox/OrderBoxCell';
import { OrderBoxListProps } from '@/components/Order/OrderBox/types';

const OrderBoxList = ({ items, isMuted, className }: OrderBoxListProps) => {
  return (
    <dl className={clsx(className, ORDER_BOX_LIST_BASE_STYLE)}>
      {items.map(({ packageName, boxCount, unitCount }) => (
        <OrderBoxCell
          boxCount={boxCount}
          isMuted={isMuted}
          key={packageName}
          packageName={packageName}
          unitCount={unitCount}
        />
      ))}
    </dl>
  );
};

export default OrderBoxList;
