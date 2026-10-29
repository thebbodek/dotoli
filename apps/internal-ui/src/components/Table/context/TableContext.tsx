import { createContext, PropsWithChildren, useContext } from 'react';

import { TABLE_THEMES } from '@/components/Table/constants';
import {
  TableContextProps,
  TableProviderProps,
} from '@/components/Table/types';

/**
 * TableCell·TableRowGroup 은 Table 없이 단독으로 쓰일 수 있어
 * Provider 가 없을 때도 기본 테마로 동작하도록 기본값을 둔다.
 */
const TableContext = createContext<TableContextProps>({
  theme: TABLE_THEMES.GRAY,
});

export const TableProvider = ({
  theme = TABLE_THEMES.GRAY,
  children,
}: PropsWithChildren<TableProviderProps>) => {
  return (
    <TableContext.Provider value={{ theme }}>{children}</TableContext.Provider>
  );
};

export const useTableContext = () => useContext(TableContext);
