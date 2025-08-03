import { FILTER_STEPS } from '@/components/Filter/constants';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const FilterHeaderTitle = () => {
  const { filterStep, currentOptions } = useFilterPanelContext();
  const title =
    filterStep === FILTER_STEPS.IDLE ? '필터' : currentOptions!.label;

  return (
    <Typography
      as='strong'
      className='mr-auto'
      color='black'
      variant={TYPOGRAPHY_VARIANTS.BODY_16_B}
    >
      {title}
    </Typography>
  );
};

export default FilterHeaderTitle;
