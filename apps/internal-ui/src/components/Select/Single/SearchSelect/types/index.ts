import { InputSearchProps } from '@/components/Input';
import {
  SelectValue,
  SingleSelectBaseItemProps,
  SingleSelectBaseProps,
} from '@/components/Select/Single/shared';

export interface SearchSelectProps<T extends SelectValue>
  extends Omit<SingleSelectBaseProps<T>, 'popoverWrapperClassName' | 'type'> {
  inputOption?: Omit<
    InputSearchProps,
    'rootClassName' | 'type' | 'hiddenLabel' | 'label'
  >;
}

export interface SearchSelectItemProps<T extends SelectValue>
  extends Pick<SingleSelectBaseItemProps<T>, 'value' | 'label'> {}
