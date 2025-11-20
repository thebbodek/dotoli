import { ExecuteFunction } from '@/executeFunction/types';

export const executeFunction = <T>({
  disabled = false,
  fn,
}: ExecuteFunction<T>) => {
  return !disabled ? fn : undefined;
};
