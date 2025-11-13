import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';

const SelectBaseListEmpty = () => {
  return (
    <li className='in-flex-v-stack-center flex-1'>
      <Icon
        className='text-in-gray-04 bg-in-gray-01 rounded-in-full mb-[0.375rem] h-[1.875rem] w-[1.875rem] text-[1rem]'
        iconKey='empty'
        aria-hidden
      />
      <Typography color='gray-04' variant='body-14-r'>
        검색 결과가 없습니다
      </Typography>
    </li>
  );
};

export default SelectBaseListEmpty;
