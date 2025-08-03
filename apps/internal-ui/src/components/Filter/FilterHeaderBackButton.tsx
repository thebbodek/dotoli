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
      className='text-in-black'
      arialLabel='뒤로가기'
      iconKey='caret-left'
      onClick={handleClick}
    />
  );
};

export default FilterHeaderBackButton;
