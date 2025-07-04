import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { InputLabelProps } from '@/components/shared/components/InputLabel/types';

const InputLabel = ({
  children,
  htmlFor,
  badge,
  required,
}: PropsWithChildren<InputLabelProps>) => {
  const className = clsx(
    'text-in-body-14-m text-in-gray-07 mb-0.5',
    badge && 'flex items-center gap-x-0.5',
    required && 'before:text-in-primary-06 before:content-["*"]',
  );

  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={className}>
        {children}
        {badge && badge}
      </label>
    );
  }

  return (
    <div className={className}>
      {children}
      {badge && badge}
    </div>
  );
};

export default InputLabel;
