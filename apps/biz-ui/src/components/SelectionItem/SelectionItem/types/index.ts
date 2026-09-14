import { InputHTMLAttributes, RefAttributes } from 'react';

import { SelectionItemOption } from '@/components/SelectionItem/shared/types';

export interface SelectionItemProps
  extends SelectionItemOption,
    Pick<
      InputHTMLAttributes<HTMLInputElement>,
      'className' | 'id' | 'name' | 'value'
    >,
    Required<
      Pick<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'>
    >,
    RefAttributes<HTMLInputElement> {}
