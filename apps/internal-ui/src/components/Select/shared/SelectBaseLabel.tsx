import { PropsWithChildren } from 'react';

import { useSelectLabelContext } from '@/components/Select/shared/context/SelectLabelContext';
import { SelectBaseLabelProps } from '@/components/Select/shared/types';
import { InputLabel } from '@/components/shared';

const SelectBaseLabel = ({
  label,
  hiddenLabel,
  badge,
}: PropsWithChildren<SelectBaseLabelProps>) => {
  const { id, required } = useSelectLabelContext();

  return (
    <InputLabel id={id} badge={badge} required={required} hidden={hiddenLabel}>
      {label}
    </InputLabel>
  );
};

export default SelectBaseLabel;
