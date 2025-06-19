import { Button } from '@/components/Button';
import { TableCellButtonProps } from '@/components/Table/types';

const TableCellButton = ({ items }: TableCellButtonProps) => {
  return (
    <ul className='flex-h-stack-center gap-x-4'>
      {items.map((item, index) => (
        <li key={index}>
          <Button {...item} size='sm' variant='text' />
        </li>
      ))}
    </ul>
  );
};

export default TableCellButton;
