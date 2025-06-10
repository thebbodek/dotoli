import { InputSearchProps } from '@/components/Input';
import {
  SelectBaseItemProps,
  SelectBaseLabelProps,
  SelectBaseProps,
} from '@/components/Select/shared';

export interface SearchSelectProps
  extends Pick<
      SelectBaseProps,
      | 'className'
      | 'required'
      | 'disabled'
      | 'feedback'
      | 'isError'
      | 'popoverOption'
    >,
    Pick<SelectBaseLabelProps, 'badge'> {
  label: string;
  placeholder?: string;
  value: string | number | null;
  inputOption?: Omit<InputSearchProps, 'rootClassName' | 'type'>;
}

export interface SearchSelectItemProps
  extends Pick<SelectBaseItemProps, 'onSelect' | 'selected'> {}
