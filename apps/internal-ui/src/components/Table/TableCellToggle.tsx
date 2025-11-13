import { Toggle, ToggleProps } from '@/components/Toggle';

const TableCellToggle = (props: Omit<ToggleProps, 'size'>) => {
  return (
    <Toggle
      {...props}
      labelClassName='font-medium'
      labelColor='gray-06'
      size='sm'
    />
  );
};

export default TableCellToggle;
