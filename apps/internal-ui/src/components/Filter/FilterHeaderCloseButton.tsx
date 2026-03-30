import { FILTER_STEPS } from '@/components/Filter/constants';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import { FilterHeaderCloseButtonProps } from '@/components/Filter/types';
import { MultiSelectCloseButton } from '@/components/Select/Multi/shared';

const FilterHeaderCloseButton = ({ close }: FilterHeaderCloseButtonProps) => {
  const { setFilterStep, setCurrentSelectValue } = useFilterPanelContext();

  const handleClose = () => {
    setFilterStep(FILTER_STEPS.IDLE);
    setCurrentSelectValue(null);
    close();
  };

  return (
    <MultiSelectCloseButton
      className='text-in-gray-06 in-tablet:block ml-2 hidden'
      onClose={handleClose}
    />
  );
};

export default FilterHeaderCloseButton;
