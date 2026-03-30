import { FILTER_STEPS } from '@/components/Filter/constants';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import { FilterHeaderMobileCloseButtonProps } from '@/components/Filter/types';
import { MultiSelectCloseButton } from '@/components/Select/Multi/shared';

const FilterHeaderMobileCloseButton = ({
  close,
}: FilterHeaderMobileCloseButtonProps) => {
  const { setFilterStep } = useFilterPanelContext();

  const handleClose = () => {
    setFilterStep(FILTER_STEPS.IDLE);
    close();
  };

  return (
    <MultiSelectCloseButton
      className='text-in-black in-tablet:hidden block'
      onClose={handleClose}
    />
  );
};

export default FilterHeaderMobileCloseButton;
