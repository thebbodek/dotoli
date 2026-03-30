import {
  Button,
  BUTTON_SIZES,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
} from '@/components/Button';
import { MultiSelectResetButtonProps } from '@/components/Select/Multi/shared/types';

const MultiSelectResetButton = ({ onReset }: MultiSelectResetButtonProps) => {
  return (
    <Button
      iconOption={{ iconKey: 'arrow-clockwise' }}
      label='초기화'
      size={BUTTON_SIZES.SM}
      theme={BUTTON_THEMES.GRAY}
      variant={BUTTON_VARIANTS.OUTLINED}
      onClick={onReset}
    />
  );
};

export default MultiSelectResetButton;
