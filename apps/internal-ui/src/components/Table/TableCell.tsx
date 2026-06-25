import clsx from 'clsx';

import {
  TABLE_CELL_DEFAULT_BACKGROUND_STYLES,
  TABLE_CELL_DEFAULT_BORDER_STYLES,
  TABLE_CELL_DEFAULT_TEXT_STYLES,
  TABLE_CELL_FIXED_LEFT_BACKGROUND_STYLE,
  TABLE_CELL_FIXED_LEFT_BORDER_STYLE,
  TABLE_CELL_HIGHLIGHT_BACKGROUND_STYLE,
  TABLE_CELL_HIGHLIGHT_HOVER_BACKGROUND_STYLE,
  TABLE_CELL_ROLES,
  TABLE_CELL_STYLES,
  TABLE_CELL_TEXT_TONE_STYLES,
  TABLE_CELL_TEXT_TONES,
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
  isHighlighted = false,
  textTone = TABLE_CELL_TEXT_TONES.DEFAULT,
  children,
  className,
}: TableCellProps) => {
  const isHighlightedColumn =
    isHighlighted && role !== TABLE_CELL_ROLES.COLUMN_HEADER;

  const resolveBackgroundClassName = () => {
    if (isHighlightedColumn) return TABLE_CELL_HIGHLIGHT_BACKGROUND_STYLE;

    if (isFixedLeft) return TABLE_CELL_FIXED_LEFT_BACKGROUND_STYLE;

    return TABLE_CELL_DEFAULT_BACKGROUND_STYLES[role];
  };

  const backgroundClassName = resolveBackgroundClassName();

  const borderClassName = isFixedLeft
    ? TABLE_CELL_FIXED_LEFT_BORDER_STYLE
    : TABLE_CELL_DEFAULT_BORDER_STYLES[role];

  const textClassName =
    textTone === TABLE_CELL_TEXT_TONES.DANGER
      ? TABLE_CELL_TEXT_TONE_STYLES[TABLE_CELL_TEXT_TONES.DANGER]
      : TABLE_CELL_DEFAULT_TEXT_STYLES[role];

  return (
    <div
      className={clsx(
        className,
        'cell shrink-0 pl-4 last:pr-4',
        TABLE_CELL_STYLES[role],
        backgroundClassName,
        isHighlightedColumn && TABLE_CELL_HIGHLIGHT_HOVER_BACKGROUND_STYLE,
        borderClassName,
        textClassName,
      )}
      role={role}
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
