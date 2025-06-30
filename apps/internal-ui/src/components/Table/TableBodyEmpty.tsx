import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';

const TableBodyEmpty = () => {
  return (
    <div role='row' className='flex-v-stack-center h-full flex-1 gap-y-3'>
      <Icon
        iconKey='magnifying-glass'
        className='border-gray-01 text-gray-03 h-[3.25rem] w-[3.25rem] rounded-full border-2 text-[1.5rem]'
      />
      <Typography as='p' color='gray-06' variant='body-16-r'>
        검색 결과가 없습니다. 다른 내용으로 검색해보세요.
      </Typography>
    </div>
  );
};

export default TableBodyEmpty;
