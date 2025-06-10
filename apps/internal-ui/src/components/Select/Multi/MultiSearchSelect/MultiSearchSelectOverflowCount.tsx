import { MultiSearchSelectOverflowCountProps } from '@/components/Select/Multi/MultiSearchSelect/types';
import { Typography } from '@/components/Typography';

const MultiSearchSelectOverflowCount = ({
  count,
  disabled,
}: MultiSearchSelectOverflowCountProps) => {
  return (
    <Typography
      color={!disabled ? 'black' : 'gray-05'}
      variant='body-14-r'
      className='w-[2.375rem] shrink-0'
    >
      +{count}
    </Typography>
  );
};

export default MultiSearchSelectOverflowCount;
