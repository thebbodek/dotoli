import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';

const TableBodyEmpty = () => {
  return (
    <div
      className='in-flex-v-stack-center text-in-gray-05 gap-y-1 py-5'
      role='row'
    >
      <Icon className='text-[1.25rem]' iconKey='selection-slash' />
      <Typography
        as='p'
        className='in-tablet:text-in-body-14-r'
        variant='body-12-m'
      >
        내용이 없습니다
      </Typography>
    </div>
  );
};

export default TableBodyEmpty;
