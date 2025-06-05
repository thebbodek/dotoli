import {
  SelectValue,
  SingleSelectBaseItemProps,
  SingleSelectBaseProps,
} from '@/components/Select/Single/shared';

export interface SelectProps<T extends SelectValue>
  extends Omit<SingleSelectBaseProps<T>, 'popoverWrapperClassName' | 'type'> {}

export interface SelectItemProps<T extends SelectValue>
  extends Pick<SingleSelectBaseItemProps<T>, 'value' | 'label'> {}
