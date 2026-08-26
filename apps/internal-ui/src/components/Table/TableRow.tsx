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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus -- 행 onClick은 포인터 편의, 실제 조작은 셀 내부 인터랙티브 요소가 담당
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
