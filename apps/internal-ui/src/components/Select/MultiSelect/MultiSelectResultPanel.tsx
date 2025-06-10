import clsx from 'clsx';

import { MultiSelectResultPanelProps } from '@/components/Select/MultiSelect/types';

const MultiSelectResultPanel = ({
  id,
  label,
  count,
  className,
}: MultiSelectResultPanelProps) => {
  return (
    <dl id={id} className={clsx(className, 'text-gray-05 flex items-center')}>
      <dt>{label}</dt>
      <dd>({count})</dd>
    </dl>
  );
};

export default MultiSelectResultPanel;
