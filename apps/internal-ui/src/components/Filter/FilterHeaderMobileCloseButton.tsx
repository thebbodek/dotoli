import { FILTER_STEPS } from '@/components/Filter/constants';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import FilterCloseButton from '@/components/Filter/FilterCloseButton';
import { FilterHeaderMobileCloseButtonProps } from '@/components/Filter/types';

const FilterHeaderMobileCloseButton = ({
  close,
}: FilterHeaderMobileCloseButtonProps) => {
  const { setFilterStep } = useFilterPanelContext();

  const handleClose = () => {
    setFilterStep(FILTER_STEPS.IDLE);
    close();
  };

  return (
    <FilterCloseButton
      className='text-in-black in-tablet:hidden block'
      onClose={handleClose}
    />
  );
};

export default FilterHeaderMobileCloseButton;
