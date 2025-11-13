import { Button, BUTTON_SIZES, BUTTON_THEMES } from '@/components/Button';
import { FilterSelectButtonProps } from '@/components/Filter/types';

const FilterSelectButton = ({ onClick, disabled }: FilterSelectButtonProps) => {
  return (
    <div className='border-t-in-gray-02 border-t p-4'>
      <Button
        className='w-full'
        disabled={disabled}
        label='선택 완료'
        size={BUTTON_SIZES.SM}
        theme={BUTTON_THEMES.PRIMARY}
        onClick={onClick}
      />
    </div>
  );
};

export default FilterSelectButton;
