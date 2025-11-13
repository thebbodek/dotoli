import { PropsWithChildren } from 'react';

import { useSelectLabelContext } from '@/components/Select/shared/context/SelectLabelContext';
import { SelectBaseLabelProps } from '@/components/Select/shared/types';
import { InputLabel } from '@/components/shared';

const SelectBaseLabel = ({
  label,
  hidden,
  badge,
}: PropsWithChildren<SelectBaseLabelProps>) => {
  const { id, required } = useSelectLabelContext();

  return (
    <InputLabel badge={badge} hidden={hidden} id={id} required={required}>
      {label}
    </InputLabel>
  );
};

export default SelectBaseLabel;
