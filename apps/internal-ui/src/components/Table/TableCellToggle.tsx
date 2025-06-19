import { Toggle, ToggleProps } from '@/components/Toggle';

const TableCellToggle = (props: Omit<ToggleProps, 'size'>) => {
  return (
    <Toggle
      {...props}
      size='sm'
      labelColor='gray-06'
      labelClassName='font-medium'
    />
  );
};

export default TableCellToggle;
