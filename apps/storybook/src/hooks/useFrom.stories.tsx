import { useForm } from '@hooks/index';
import { UseFormErrors } from '@hooks/useForm/types';

import { FormEvent } from 'react';
import clsx from 'clsx';

const meta = {
  title: 'core/hooks/useForm',
};

export default meta;

export const Default = () => {
  const { values, handleChange, errors } = useForm({
    initialValues: {
      name: null,
    },
    validate: (values) => {
      const errors: UseFormErrors = {};

      if (values.name !== null && !values.name) {
        errors.name = '이름을 입력해주세요';
      }

      return errors;
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('전송완료');
  };

  return (
    <form onSubmit={onSubmit} className={'flex flex-col gap-2'}>
      <input
        type='text'
        name='name'
        value={values.name || ''}
        onChange={handleChange}
        placeholder='이름을 입력해주세요'
        className={clsx(
          'py-2 px-3 rounded-lg outline-none',
          errors.name ? 'border border-red-400' : 'border',
        )}
      />
      {errors.name && <p className='text-red-400 text-sm'>{errors.name}</p>}
      <button
        type='submit'
        className='bg-black text-white px-3 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed'
        disabled={!values.name}
      >
        Submit
      </button>
    </form>
  );
};
