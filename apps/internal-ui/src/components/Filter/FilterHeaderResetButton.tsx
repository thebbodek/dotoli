import {
  Button,
  BUTTON_SIZES,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
} from '@/components/Button';
import { FILTER_STEPS } from '@/components/Filter/constants';
import { useFilterContext } from '@/components/Filter/context';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';

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

  return (
    <Button
      iconOption={{ iconKey: 'arrow-clockwise' }}
      label='초기화'
      size={BUTTON_SIZES.SM}
      theme={BUTTON_THEMES.GRAY}
      variant={BUTTON_VARIANTS.OUTLINED}
      onClick={handleClick}
    />
  );
};

export default FilterHeaderResetButton;
