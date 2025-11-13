import { Children, PropsWithChildren, useRef } from 'react';

import { Button } from '@/components/Button';
import { Flex } from '@/components/Flex';
import { FormRepeaterContextProvider } from '@/components/FormRepeater/context/FormRepeaterContext';
import FormRepeaterFooter from '@/components/FormRepeater/FormRepeaterFooter';
import FormRepeaterHeader from '@/components/FormRepeater/FormRepeaterHeader';
import FormRepeaterHeaderContent from '@/components/FormRepeater/FormRepeaterHeaderContent';
import FormRepeaterList from '@/components/FormRepeater/FormRepeaterList';
import FormRepeaterListItem from '@/components/FormRepeater/FormRepeaterListItem';
import FormRepeaterListItemBadgeContent from '@/components/FormRepeater/FormRepeaterListItemBadgeContent';
import FormRepeaterListItemInputContent from '@/components/FormRepeater/FormRepeaterListItemInputContent';
import FormRepeaterListItemRadioContent from '@/components/FormRepeater/FormRepeaterListItemRadioContent';
import FormRepeaterListItemSelectContent from '@/components/FormRepeater/FormRepeaterListItemSelectContent';
import FormRepeaterListItemTextContent from '@/components/FormRepeater/FormRepeaterListItemTextContent';
import FormRepeaterListItemToggleContent from '@/components/FormRepeater/FormRepeaterListItemToggleContent';
import {
  FormRepeaterHeaderContentProps,
  FormRepeaterProps,
} from '@/components/FormRepeater/types';
import { ChildrenElement } from '@/components/shared';

const FormRepeater = ({
  onAdd,
  onAllReset,
  changedRowsCount = 0,
  disabled = false,
  className,
  children,
}: PropsWithChildren<FormRepeaterProps>) => {
  const listRef = useRef<HTMLUListElement>(null);
  const hasChangedRows = changedRowsCount > 0;

  const scrollToBottom = () => {
    setTimeout(() => {
      if (!listRef || !listRef.current) return;

      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 50);
  };

  const [header] = Children.toArray(
    children,
  ) as ChildrenElement<PropsWithChildren>[];
  const columns = Children.toArray(header.props.children);

  return (
    <Flex className={className} direction='column' gap='8'>
      <div className='in-flex-v-stack border-in-gray-02 rounded-in-12 bg-in-white border p-2.5 pt-4'>
        <FormRepeaterContextProvider
          columns={columns as ChildrenElement<FormRepeaterHeaderContentProps>[]}
          disabled={disabled}
          listRef={listRef}
        >
          {children}
        </FormRepeaterContextProvider>
        {onAdd && (
          <Button
            className='mt-3'
            disabled={disabled}
            iconOption={{ iconKey: 'plus' }}
            label='추가'
            size='sm'
            theme='primary'
            variant='outlined'
            onClick={() => {
              onAdd();
              scrollToBottom();
            }}
          />
        )}
      </div>
      {hasChangedRows && onAllReset && (
        <FormRepeaterFooter
          changedRowsCount={changedRowsCount}
          disabled={disabled}
          onAllReset={onAllReset}
        />
      )}
    </Flex>
  );
};

export default FormRepeater;

FormRepeater.displayName = 'FormRepeater';
FormRepeater.Header = FormRepeaterHeader;
FormRepeater.HeaderContent = FormRepeaterHeaderContent;
FormRepeater.List = FormRepeaterList;
FormRepeater.Item = FormRepeaterListItem;
FormRepeater.Input = FormRepeaterListItemInputContent;
FormRepeater.Select = FormRepeaterListItemSelectContent;
FormRepeater.Toggle = FormRepeaterListItemToggleContent;
FormRepeater.Radio = FormRepeaterListItemRadioContent;
FormRepeater.Badge = FormRepeaterListItemBadgeContent;
FormRepeater.Text = FormRepeaterListItemTextContent;
