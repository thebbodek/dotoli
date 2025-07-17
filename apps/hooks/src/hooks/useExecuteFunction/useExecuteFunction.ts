import { useCallback } from 'react';

import { ExecuteFunction, executeFunction } from '@bbodek/utils';

const useExecuteFunction = () => {
  const execute = useCallback(
    <T>(params: ExecuteFunction<T>) => executeFunction(params),
    [],
  );

  return { execute };
};

export default useExecuteFunction;
