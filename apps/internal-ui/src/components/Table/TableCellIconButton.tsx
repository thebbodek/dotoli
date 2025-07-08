import { IconButton } from '@/components/Button';
import { TableCellIconButtonProps } from '@/components/Table/types';

const TableCellIconButton = ({ items }: TableCellIconButtonProps) => {
  return (
    <ul className='in-flex-h-stack items-center gap-x-2'>
      {items.map((item, index) => (
        <li key={index}>
          <IconButton {...item} theme='hover-white' type='button' />
        </li>
      ))}
    </ul>
  );
};

export default TableCellIconButton;
