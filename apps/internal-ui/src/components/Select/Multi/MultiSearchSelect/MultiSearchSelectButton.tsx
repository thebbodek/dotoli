import { Button, BUTTON_SIZES, BUTTON_THEMES } from '@/components/Button';
import { MultiSearchSelectButtonProps } from '@/components/Select/Multi/MultiSearchSelect/types';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';

const MultiSearchSelectButton = ({ close }: MultiSearchSelectButtonProps) => {
  const { onChange, onSearch } = useMultiSelectBaseContext();

  const handleClick = () => {
    onSearch({ value: null });
    onChange();
    close();
  };

  return (
    <div className='border-t-in-gray-02 border-t p-4'>
      <Button
        label='선택 완료'
        theme={BUTTON_THEMES.PRIMARY}
        size={BUTTON_SIZES.SM}
        onClick={handleClick}
        className='w-full'
      />
    </div>
  );
};

export default MultiSearchSelectButton;
