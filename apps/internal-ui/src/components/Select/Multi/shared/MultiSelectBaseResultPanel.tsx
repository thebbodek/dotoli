import clsx from 'clsx';

import { MultiSelectBaseResultPanelProps } from '@/components/Select/Multi/shared/types';

const MultiSelectBaseResultPanel = ({
  label,
  count,
  className,
}: MultiSelectBaseResultPanelProps) => {
  return (
    <dl className={clsx(className, 'text-in-gray-05 flex items-center')}>
      <dt>{label}</dt>
      <dd>({count})</dd>
    </dl>
  );
};

export default MultiSelectBaseResultPanel;
