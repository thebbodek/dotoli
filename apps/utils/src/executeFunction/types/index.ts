export interface ExecuteFunction<T extends () => void> {
  disabled?: boolean;
  fn: T;
}
