import clsx from 'clsx';
import { useId } from 'react';

import useInputChange from '@/components/Input/shared/hooks/useInputChange';
import { TABLE_CELL_INPUT_STYLES } from '@/components/Table/constants';
import TableCell from '@/components/Table/TableCell';
import { TableInputCellProps } from '@/components/Table/types';
import { Tooltip } from '@/components/Tooltip';

const TableInputCell = ({
  value,
  name,
  type = 'text',
  isError = false,
  feedback,
  onChange,
  regCallback,
  className,
  ...rest
}: TableInputCellProps) => {
  const feedbackId = useId();
  const { inputValue, handleChange } = useInputChange({
    value,
    name,
    onChange,
    regCallback,
  });

  return (
    <TableCell
      className={clsx(className, 'has-[input]:p-0', isError && 'error group')}
    >
      <Tooltip
        id={feedbackId}
        role='alert'
        ariaLive='assertive'
        content={feedback}
        hidden={!isError}
        placement={'bottom-start'}
        color={'red-03'}
        rootClassName='h-full'
        isKeepFloating
      >
        <input
          type={type}
          value={inputValue ?? ''}
          onChange={handleChange}
          aria-invalid={isError}
          aria-errormessage={feedbackId}
          className={clsx(
            'h-full w-full py-2.5 pl-4',
            Object.values(TABLE_CELL_INPUT_STYLES),
          )}
          {...rest}
        />
      </Tooltip>
    </TableCell>
  );
};

export default TableInputCell;
