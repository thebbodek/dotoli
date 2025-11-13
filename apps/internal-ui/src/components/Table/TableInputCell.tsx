import clsx from 'clsx';
import { useId } from 'react';

import { INPUT_DEFAULT_MAX_LENGTH } from '@/components/Input';
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
  maxLength = INPUT_DEFAULT_MAX_LENGTH,
  ...rest
}: TableInputCellProps) => {
  const feedbackId = useId();
  const { inputValue, handleChange } = useInputChange({
    value,
    name,
    onChange,
    regCallback,
    maxLength,
  });

  return (
    <TableCell
      className={clsx(className, 'has-[input]:p-0', isError && 'error group')}
    >
      <Tooltip
        ariaLive='assertive'
        color='red-03'
        content={feedback}
        hidden={!isError}
        id={feedbackId}
        placement='bottom-start'
        role='alert'
        rootClassName='h-full'
        isKeepFloating
      >
        <input
          className={clsx(
            'h-full w-full py-2.5 pl-4',
            Object.values(TABLE_CELL_INPUT_STYLES),
          )}
          aria-errormessage={feedbackId}
          aria-invalid={isError}
          type={type}
          value={inputValue ?? ''}
          onChange={handleChange}
          {...rest}
        />
      </Tooltip>
    </TableCell>
  );
};

export default TableInputCell;
