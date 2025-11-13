import { IconButton } from '@/components/Button';
import { FILTER_STEPS } from '@/components/Filter/constants';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';

const FilterHeaderBackButton = () => {
  const { setFilterStep, setCurrentSelectValue } = useFilterPanelContext();

  const handleClick = () => {
    setFilterStep(FILTER_STEPS.IDLE);
    setCurrentSelectValue(null);
  };

  return (
    <IconButton
      aria-label='뒤로가기'
      className='text-in-black'
      iconKey='caret-left'
      onClick={handleClick}
    />
  );
};

export default FilterHeaderBackButton;
