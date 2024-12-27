import { ChangeEvent, useState } from 'react';

import { Props, UseFormErrors, UseFormReturnType } from './types';

const useForm = <T extends object>({
  initialValues,
  validate,
}: Props<T>): UseFormReturnType<T> => {
  const [values, setValuesState] = useState<T>(initialValues);
  const [errors, setErrors] = useState<UseFormErrors>({} as UseFormErrors);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name in initialValues) {
      setValuesState({ ...values, [name]: value });

      if (validate) {
        const validationErrors = validate({
          ...values,
          [name]: value,
        }) as UseFormErrors;

        setErrors(validationErrors);
      }
    }
  };

  const setValues = (newValues: T | ((prevValues: T) => T)) => {
    const updatedValues =
      typeof newValues === 'function' ? newValues(values) : newValues;

    setValuesState(updatedValues);

    if (validate) {
      const validationErrors = validate(updatedValues) as UseFormErrors;

      setErrors(validationErrors);
    }
  };

  return {
    values,
    setValues,
    errors,
    handleChange,
    setErrors,
  };
};

export default useForm;
