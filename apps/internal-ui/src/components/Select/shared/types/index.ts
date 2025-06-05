import { Dispatch, SetStateAction } from 'react';

export interface SelectProviderValue {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface SelectProps {}
