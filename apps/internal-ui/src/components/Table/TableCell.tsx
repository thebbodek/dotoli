import clsx from 'clsx';

import {
  TABLE_CELL_ROLES,
  TABLE_CELL_STYLES,
} from '@/components/Table/constants';
import TableCellButton from '@/components/Table/TableCellButton';
import TableCellCheckbox from '@/components/Table/TableCellCheckbox';
import TableCellIconButton from '@/components/Table/TableCellIconButton';
import TableCellPersona from '@/components/Table/TableCellPersona';
import TableCellToggle from '@/components/Table/TableCellToggle';
import { TableCellProps } from '@/components/Table/types';

const TableCell = ({
  role = TABLE_CELL_ROLES.CELL,
  isFixedLeft = false,
  children,
  className,
}: TableCellProps) => {
  return (
    <div
      role={role}
      className={clsx(
        className,
        'cell shrink-0 pl-4 last:pr-4',
        TABLE_CELL_STYLES[role],
        isFixedLeft && 'sticky left-0',
      )}
    >
      {children}
    </div>
  );
};

export default TableCell;

TableCell.displayName = 'TableCell';
TableCell.Checkbox = TableCellCheckbox;
TableCell.Toggle = TableCellToggle;
TableCell.Persona = TableCellPersona;
TableCell.Button = TableCellButton;
TableCell.IconButton = TableCellIconButton;
