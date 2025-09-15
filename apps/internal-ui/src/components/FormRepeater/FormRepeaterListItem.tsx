import clsx from 'clsx';
import { Children, isValidElement, PropsWithChildren } from 'react';

import { useFormRepeaterContext } from '@/components/FormRepeater/context/FormRepeaterContext';
import { FormRepeaterListItemContentProvider } from '@/components/FormRepeater/context/FormRepeaterListItemContentContext';
import FormRepeaterListItemActionsContent from '@/components/FormRepeater/FormRepeaterListItemActionsContent';
import {
  FormRepeaterListItemContentProps,
  FormRepeaterListItemProps,
} from '@/components/FormRepeater/types';
import { ChildrenElement } from '@/components/shared';

const FormRepeaterListItem = <T extends object>({
  children,
  onDelete,
  onReset,
  changedValue,
}: PropsWithChildren<FormRepeaterListItemProps<T>>) => {
  const { columns } = useFormRepeaterContext();
  const { originalValue } = changedValue ?? {};
  const isChanged = !!changedValue;
  const isAdded = !originalValue && isChanged;
  const useAction = !!onDelete || !!onReset;

  const handleReset = () => {
    if (!originalValue) return;

    onReset!({ originalValue });
  };

  return (
    <li
      className={clsx(
        'in-flex-h-stack gap-x-3 px-4 py-2.5',
        isChanged && 'bg-in-primary-01',
      )}
    >
      {Children.map(children, (child, index) => {
        const column = columns[index];

        if (
          !column ||
          !isValidElement<ChildrenElement<FormRepeaterListItemContentProps>>(
            child,
          )
        ) {
          return null;
        }

        return (
          <FormRepeaterListItemContentProvider column={column}>
            {child}
          </FormRepeaterListItemContentProvider>
        );
      })}
      {useAction && (
        <FormRepeaterListItemActionsContent
          isAdded={isAdded}
          isChanged={isChanged}
          onDelete={onDelete}
          onReset={onReset ? handleReset : undefined}
        />
      )}
    </li>
  );
};

export default FormRepeaterListItem;
