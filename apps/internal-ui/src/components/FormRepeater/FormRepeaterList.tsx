import clsx from 'clsx';
import { Children, HTMLAttributes, PropsWithChildren } from 'react';

import { useFormRepeaterContext } from '@/components/FormRepeater/context/FormRepeaterContext';
import { FormRepeaterListProvider } from '@/components/FormRepeater/context/FormRepeaterListContext';

const FormRepeaterBody = ({
  className,
  children,
}: PropsWithChildren<Pick<HTMLAttributes<HTMLDivElement>, 'className'>>) => {
  const { listRef } = useFormRepeaterContext();

  return (
    <ul ref={listRef} className={clsx(className, 'overflow-y-auto')}>
      <FormRepeaterListProvider itemsCount={Children.count(children)}>
        {children}
      </FormRepeaterListProvider>
    </ul>
  );
};

export default FormRepeaterBody;
