import { ExecuteFunction } from '@/executeFunction/types';

export const executeFunction = <T extends () => void>({
  disabled = false,
  fn,
}: ExecuteFunction<T>) => {
  return !disabled ? fn() : undefined;
};
