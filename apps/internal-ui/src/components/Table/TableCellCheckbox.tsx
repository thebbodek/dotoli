import { Checkbox, CheckboxProps } from '@/components/Checkbox';
import { Tooltip } from '@/components/Tooltip';

const TableCellCheckbox = ({
  label,
  ...props
}: Omit<CheckboxProps, 'size'>) => {
  return (
    <Tooltip
      content={label}
      hidden={!label}
      placement='top'
      rootClassName='h-full in-flex-h-stack-center'
    >
      <Checkbox {...props} size='sm' />
    </Tooltip>
  );
};

export default TableCellCheckbox;
