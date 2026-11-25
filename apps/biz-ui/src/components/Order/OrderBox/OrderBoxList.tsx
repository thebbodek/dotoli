import clsx from 'clsx';

import { ORDER_BOX_LIST_BASE_STYLE } from '@/components/Order/OrderBox/constants';
import OrderBoxRow from '@/components/Order/OrderBox/OrderBoxRow';
import { OrderBoxListProps } from '@/components/Order/OrderBox/types';

const OrderBoxList = ({ items, styles, className }: OrderBoxListProps) => {
  return (
    <dl className={clsx(className, ORDER_BOX_LIST_BASE_STYLE)}>
      {items.map(({ itemName, quantity, isNoOrder }) => (
        <OrderBoxRow
          isNoOrder={isNoOrder}
          itemName={itemName}
          key={itemName}
          quantity={quantity}
          styles={styles}
        />
      ))}
    </dl>
  );
};

export default OrderBoxList;
