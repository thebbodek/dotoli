import { StepActionParams } from '@/components/shared';

export interface UseStepDialogParams<T extends string> {
  steps: Record<string, T>;
  initialStep?: T;
}

export interface UseStepDialogReturnType<T extends string> {
  models: {
    step: T | null;
  };
  operations: {
    goToStep: (params: StepActionParams<T>) => void;
  };
}
