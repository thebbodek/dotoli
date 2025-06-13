import { HTMLAttributes, ReactNode } from 'react';

import { PopoverProps } from '@/components/Popover';
import { ComponentPropsRef } from '@/components/shared/types';

export interface SelectBaseProps
  extends Pick<SelectLabelContextValue, 'required'>,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<PopoverProps, 'trigger'> {
  label: ReactNode;
  children: ((props: { close: () => void }) => ReactNode) | ReactNode;
  popoverOption?: Omit<PopoverProps, 'trigger' | 'isOpen' | 'offset'>;
  isError?: boolean;
  feedback?: string;
  disabled?: boolean;
}

export interface SelectBaseLabelProps {
  badge?: ReactNode;
}

export interface SelectBaseTriggerProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}

export interface SelectBaseFeedbackProps
  extends Required<Pick<HTMLAttributes<HTMLDivElement>, 'id'>> {}

export interface SelectBasePopoverWrapperProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}

export interface SelectBaseItemProps {
  onSelect: () => void;
  selected?: boolean;
}

export interface SelectTriggerProviderProps extends SelectTriggerContextValue {}

export interface SelectTriggerContextValue
  extends Pick<SelectBaseProps, 'isError'>,
    ComponentPropsRef<HTMLDivElement> {
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export interface SelectLabelProviderProps extends SelectLabelContextValue {}

export interface SelectLabelContextValue
  extends Required<Pick<HTMLAttributes<HTMLSpanElement>, 'id'>> {
  required?: boolean;
}

export interface SelectListProviderProps extends SelectListContextValue {}

export interface SelectListContextValue
  extends Required<Pick<HTMLAttributes<HTMLLIElement>, 'id'>> {
  labelId: SelectLabelContextValue['id'];
  onPopoverClose: () => void;
}
