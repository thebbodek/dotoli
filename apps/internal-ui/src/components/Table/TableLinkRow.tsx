import { clsx } from 'clsx';
import Link from 'next/link';

import {
  TABLE_ROW_COMMON_STYLE,
  TABLE_ROW_STYLES,
  TABLE_ROW_VARIANTS,
} from '@/components/Table/constants';
import { TableLinkRowProps } from '@/components/Table/types';
import { renderTableCells } from '@/components/Table/utils/renderTableCells';

const TableLinkRow = ({
  className,
  children,
  ...linkProps
}: TableLinkRowProps) => {
  return (
    <Link
      className={clsx(
        className,
        TABLE_ROW_COMMON_STYLE,
        TABLE_ROW_STYLES[TABLE_ROW_VARIANTS.BODY],
      )}
      role='row'
      {...linkProps}
    >
      {renderTableCells({ children })}
    </Link>
  );
};

export default TableLinkRow;
