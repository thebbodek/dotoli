import {
  SelectBaseItemProps,
  SelectBaseLabelProps,
  SelectBaseProps,
} from '@/components/Select/shared';

export interface SelectProps
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
}

export interface SelectItemProps
  extends Pick<SelectBaseItemProps, 'onSelect' | 'selected'> {}
