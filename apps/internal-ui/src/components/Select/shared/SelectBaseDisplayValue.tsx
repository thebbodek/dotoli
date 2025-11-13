import { useSelectTriggerContext } from '@/components/Select/shared/context';
import { SelectBaseDisplayValueProps } from '@/components/Select/shared/types';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS } from '@/variants';

const SelectBaseDisplayValue = ({
  displayValue,
  hasValue,
}: SelectBaseDisplayValueProps) => {
  const { placeholder, disabled } = useSelectTriggerContext();

  const color = () => {
    if (disabled) return COLOR_VARIANTS.GRAY_05;

    if (hasValue) return COLOR_VARIANTS.BLACK;

    return COLOR_VARIANTS.GRAY_04;
  };

  return (
    <Typography className='w-full truncate' color={color()} variant='body-16-r'>
      {displayValue || placeholder}
    </Typography>
  );
};

export default SelectBaseDisplayValue;
