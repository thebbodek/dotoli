import { HTMLAttributes, ReactNode } from 'react';

import { PopoverProps } from '@/components/Popover';
import { SELECT_TYPE } from '@/components/Select/shared';
import { ComponentPropsRef } from '@/components/shared/types';

export type SelectType = (typeof SELECT_TYPE)[keyof typeof SELECT_TYPE];

export interface SelectBaseChildrenProps {
  close: () => void;
}

export interface SelectBaseProps
  extends Pick<SelectLabelContextValue, 'required'>,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<PopoverProps, 'trigger'>,
    Pick<SelectTriggerContextValue, 'isError' | 'placeholder'> {
  label: ReactNode;
  children: ((props: SelectBaseChildrenProps) => ReactNode) | ReactNode;
  popoverOption?: Omit<PopoverProps, 'trigger' | 'isOpen' | 'offset'>;
  feedback?: string;
  disabled?: boolean;
  type: SelectType;
  controls: Required<HTMLAttributes<HTMLDivElement>['aria-controls']>;
  labelId: SelectLabelContextValue['id'];
}

export interface SelectBaseLabelProps {
  badge?: ReactNode;
}

export interface SelectBaseTriggerWrapperProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}

export interface SelectBaseFeedbackProps
  extends Required<Pick<HTMLAttributes<HTMLDivElement>, 'id'>> {}

export interface SelectBasePopoverWrapperProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}

export interface SelectBaseAriaAttributes
  extends Pick<
    HTMLAttributes<HTMLDivElement>,
    | 'aria-haspopup'
    | 'aria-expanded'
    | 'aria-controls'
    | 'aria-labelledby'
    | 'aria-describedby'
    | 'role'
    | 'aria-multiselectable'
    | 'aria-autocomplete'
  > {}

export interface SelectBaseItemProps
  extends Pick<HTMLAttributes<HTMLLIElement>, 'className'> {
  isSelected: boolean;
  onClick: () => void;
  label: Required<HTMLAttributes<HTMLLIElement>['title']>;
}

export interface SelectTriggerProviderProps extends SelectTriggerContextValue {}

export interface SelectTriggerContextValue
  extends ComponentPropsRef<HTMLDivElement> {
  isError?: boolean;
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export interface SelectLabelProviderProps extends SelectLabelContextValue {}

export interface SelectLabelContextValue
  extends Required<Pick<HTMLAttributes<HTMLSpanElement>, 'id'>> {
  required?: boolean;
}
