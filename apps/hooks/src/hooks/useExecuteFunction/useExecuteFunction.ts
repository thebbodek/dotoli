import { ExecuteFunction, executeFunction } from '@bbodek/utils';
import { useCallback } from 'react';

const useExecuteFunction = () => {
  const execute = useCallback(
    <T>(params: ExecuteFunction<T>) => executeFunction(params),
    [],
  );

  return { execute };
};

export default useExecuteFunction;
