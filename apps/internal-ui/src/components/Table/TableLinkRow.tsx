import { clsx } from 'clsx';
import Link from 'next/link';

import { TABLE_ROW_COMMON_STYLE } from '@/components/Table/constants';
import { TableLinkRowProps } from '@/components/Table/types';
import { renderTableCells } from '@/components/Table/utils/renderTableCells';

const TableLinkRow = ({
  className,
  children,
  ...linkProps
}: TableLinkRowProps) => {
  return (
    <Link
      className={clsx(className, TABLE_ROW_COMMON_STYLE)}
      role='row'
      {...linkProps}
    >
      {renderTableCells({ children })}
    </Link>
  );
};

export default TableLinkRow;
