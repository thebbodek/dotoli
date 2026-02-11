import { clsx } from 'clsx';

import {
  TABLE_ROW_COMMON_STYLE,
  TABLE_ROW_STYLES,
  TABLE_ROW_VARIANTS,
} from '@/components/Table/constants';
import { TableRowProps } from '@/components/Table/types';
import { renderTableCells } from '@/components/Table/utils/renderTableCells';

const TableRow = ({
  variant = TABLE_ROW_VARIANTS.BODY,
  className,
  children,
  onClick,
}: TableRowProps) => {
  return (
    <div
      className={clsx(
        className,
        TABLE_ROW_COMMON_STYLE,
        TABLE_ROW_STYLES[variant],
        onClick && 'cursor-pointer',
      )}
      role='row'
      onClick={onClick}
    >
      {renderTableCells({ children, variant })}
    </div>
  );
};

export default TableRow;
