import { Button, BUTTON_SIZES, BUTTON_THEMES } from '@/components/Button';

const FilterSelectButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <div className='border-t-in-gray-02 border-t p-4'>
      <Button
        label='선택 완료'
        theme={BUTTON_THEMES.PRIMARY}
        size={BUTTON_SIZES.SM}
        onClick={onClick}
        className='w-full'
        disabled={disabled}
      />
    </div>
  );
};

export default FilterSelectButton;
