import { createContext, PropsWithChildren, useContext } from 'react';

import {
  SingleSelectVirtualItemContextValue,
  SingleSelectVirtualItemProviderProps,
} from '@/components/Select/Single/shared/types';

const SingleSelectVirtualItemContext = createContext<
  SingleSelectVirtualItemContextValue | undefined
>(undefined);

export const SingleSelectVirtualItemProvider = ({
  'aria-posinset': ariaPosInSet,
  'aria-setsize': ariaSetSize,
  onFocus,
  onBlur,
  children,
}: PropsWithChildren<SingleSelectVirtualItemProviderProps>) => {
  return (
    <SingleSelectVirtualItemContext.Provider
      value={{
        'aria-posinset': ariaPosInSet,
        'aria-setsize': ariaSetSize,
        onFocus,
        onBlur,
      }}
    >
      {children}
    </SingleSelectVirtualItemContext.Provider>
  );
};

export const useSingleSelectVirtualItemContext = () => {
  return useContext(SingleSelectVirtualItemContext);
};
