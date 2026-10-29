import { clsx } from 'clsx';

import {
  TABLE_HEADER_THEME_STYLES,
  TABLE_ROW_COMMON_STYLE,
  TABLE_ROW_STYLES,
  TABLE_ROW_VARIANTS,
} from '@/components/Table/constants';
import { useTableContext } from '@/components/Table/context';
import { TableRowProps } from '@/components/Table/types';
import { renderTableCells } from '@/components/Table/utils/renderTableCells';

const TableRow = ({
  variant = TABLE_ROW_VARIANTS.BODY,
  className,
  children,
  onClick,
}: TableRowProps) => {
  const { theme } = useTableContext();
  const isHead = variant === TABLE_ROW_VARIANTS.HEAD;

  return (
    <div
      className={clsx(
        className,
        TABLE_ROW_COMMON_STYLE,
        TABLE_ROW_STYLES[variant],
        isHead && TABLE_HEADER_THEME_STYLES[theme].BORDER,
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
