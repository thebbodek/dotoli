import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import TableBody from '@/components/Table/TableBody';
import TableCell from '@/components/Table/TableCell';
import TableCellButton from '@/components/Table/TableCellButton';
import TableCellCheckbox from '@/components/Table/TableCellCheckbox';
import TableCellIconButton from '@/components/Table/TableCellIconButton';
import TableCellPersona from '@/components/Table/TableCellPersona';
import TableCellToggle from '@/components/Table/TableCellToggle';
import TableHead from '@/components/Table/TableHead';
import TableInputCell from '@/components/Table/TableInputCell';
import TableRow from '@/components/Table/TableRow';
import { TableProps } from '@/components/Table/types';

const Table = ({
  caption,
  children,
  className,
}: PropsWithChildren<TableProps>) => {
  return (
    <div
      aria-describedby={caption}
      aria-label={caption}
      className={clsx(className, 'overflow-auto')}
      role='table'
    >
      {caption && (
        <div className='sr-only' id={caption}>
          {caption}
        </div>
      )}
      {children}
    </div>
  );
};

export default Table;

Table.displayName = 'Table';
Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.InputCell = TableInputCell;
Table.Cell.Checkbox = TableCellCheckbox;
Table.Cell.Toggle = TableCellToggle;
Table.Cell.Persona = TableCellPersona;
Table.Cell.Button = TableCellButton;
Table.Cell.IconButton = TableCellIconButton;
