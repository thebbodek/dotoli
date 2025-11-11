import { useForm } from '@bbodek/hooks';
import { toast } from '@bbodek/utils';
import { useState } from 'react';

import { FormContentFields } from '@/stories/internal-ui/shared/types';

export interface UseFormContentProps {
  close: () => void;
}

export const useFormContent = ({ close }: UseFormContentProps) => {
  const [isPending, setIsPending] = useState(false);
  const { values, handleChange } = useForm<FormContentFields>({
    initialValues: {
      date: null,
      input: null,
      title: null,
      input1: null,
      input2: null,
      description: null,
    },
  });
  const requiredFields: (keyof FormContentFields)[] = ['date', 'title'];
  const hasError = requiredFields.some(
    (field) => !values[field] || values[field].replaceAll(' ', '') === '',
  );

  const handleConfirm = () => {
    setIsPending(true);

    setTimeout(() => {
      setIsPending(false);
      close();
      toast.success('작성이 완료되었습니다');
    }, 1000);
  };

  return {
    models: { values },
    status: { hasError, isPending },
    operations: { handleChange, handleConfirm },
  };
};
