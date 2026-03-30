import { FILTER_STEPS } from '@/components/Filter/constants';
import { useFilterContext } from '@/components/Filter/context';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import MultiSelectResetButton from '@/components/Select/Multi/shared/MultiSelectResetButton';

const FilterHeaderResetButton = () => {
  const {
    toggleValues = null,
    selectValues = null,
    onChange,
  } = useFilterContext();
  const { filterStep, currentOptions, setCurrentSelectValue } =
    useFilterPanelContext();

  const handleClick = () => {
    if (filterStep === FILTER_STEPS.SELECT_OPTION) {
      if (selectValues === null) return;

      setCurrentSelectValue(null);
      onChange({
        toggleValues,
        selectValues: {
          ...selectValues,
          [currentOptions!.key]: null,
        },
      });

      return;
    }

    return onChange({
      toggleValues: null,
      selectValues: null,
    });
  };

  return <MultiSelectResetButton onReset={handleClick} />;
};

export default FilterHeaderResetButton;
