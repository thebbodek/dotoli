import { FILTER_STEPS } from '@/components/Filter/constants';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import FilterCloseButton from '@/components/Filter/FilterCloseButton';
import { FilterHeaderCloseButtonProps } from '@/components/Filter/types';

const FilterHeaderCloseButton = ({ close }: FilterHeaderCloseButtonProps) => {
  const { setFilterStep, setCurrentSelectValue } = useFilterPanelContext();

  const handleClose = () => {
    setFilterStep(FILTER_STEPS.IDLE);
    setCurrentSelectValue(null);
    close();
  };

  return (
    <FilterCloseButton
      className='text-in-gray-06 in-tablet:block ml-2 hidden'
      onClose={handleClose}
    />
  );
};

export default FilterHeaderCloseButton;
