import { createContext, PropsWithChildren, useContext } from 'react';

import {
  DynamicVirtualListContextProps,
  DynamicVirtualListProviderProps,
} from '@/components/VirtualList/DynamicVirtualList/types';

const DynamicVirtualListContext = createContext<
  DynamicVirtualListContextProps | undefined
>(undefined);

export const DynamicVirtualListContextProvider = ({
  heightsRef,
  offsets,
  startIndex,
  gap,
  initialItemHeight,
  itemsTotalCount,
  updateOffsets,
  children,
}: PropsWithChildren<DynamicVirtualListProviderProps>) => {
  return (
    <DynamicVirtualListContext.Provider
      value={{
        heightsRef,
        offsets,
        startIndex,
        gap,
        initialItemHeight,
        itemsTotalCount,
        updateOffsets,
      }}
    >
      {children}
    </DynamicVirtualListContext.Provider>
  );
};

export const useDynamicVirtualListContext = () => {
  const context = useContext(DynamicVirtualListContext);

  if (!context) {
    throw new Error(
      'useDynamicVirtualListContext must be used within a DynamicVirtualListContext',
    );
  }

  return context;
};
