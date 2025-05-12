import { useForm, UseFormErrors } from '@bbodek/hooks';
import clsx from 'clsx';
import { FormEvent } from 'react';

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
          'outline-hidden rounded-lg border px-3 py-2',
          errors.name ? 'border-red-400' : 'border-gray-600',
        )}
      />
      {errors.name && <p className='text-sm text-red-400'>{errors.name}</p>}
      <button
        type='submit'
        className='rounded-md bg-black px-3 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300'
        disabled={!values.name}
      >
        Submit
      </button>
    </form>
  );
};
