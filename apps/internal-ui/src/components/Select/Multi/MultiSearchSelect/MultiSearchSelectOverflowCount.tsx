import { MultiSearchSelectOverflowCountProps } from '@/components/Select/Multi/MultiSearchSelect/types';
import { Typography } from '@/components/Typography';

const MultiSearchSelectOverflowCount = ({
  count,
}: MultiSearchSelectOverflowCountProps) => {
  return (
    <Typography
      color='black'
      variant='body-14-r'
      className='w-[2.375rem] shrink-0'
    >
      +{count}
    </Typography>
  );
};

export default MultiSearchSelectOverflowCount;
