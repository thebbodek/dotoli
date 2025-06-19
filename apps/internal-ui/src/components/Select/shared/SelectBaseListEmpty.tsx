import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';

const SelectBaseListEmpty = () => {
  return (
    <li className='flex-v-stack-center flex-1'>
      <Icon
        iconKey='empty'
        className='text-gray-04 bg-gray-01 mb-[0.375rem] h-[1.875rem] w-[1.875rem] rounded-full text-[1rem]'
        aria-hidden
      />
      <Typography variant='body-14-r' color='gray-04'>
        검색 결과가 없습니다
      </Typography>
    </li>
  );
};

export default SelectBaseListEmpty;
