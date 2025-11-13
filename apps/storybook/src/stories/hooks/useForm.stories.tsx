import { useForm, UseFormErrors, UseFormParams } from '@bbodek/hooks';
import { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';
import { FormEvent } from 'react';

const meta = {
  title: 'core/hooks/useForm',
  argTypes: {
    initialValues: {
      description: 'initial values',
      type: {
        name: 'other',
        required: true,
        value: 'object',
      },
      table: {
        type: {
          summary: 'object',
        },
      },
    },
    validate: {
      description: 'validate function',
      type: 'function',
    },
  },
} satisfies Meta<UseFormParams<object>>;

export default meta;

type Story = StoryObj<UseFormParams<object>>;

export const Default: Story = {
  render: () => {
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
      <form className='flex flex-col gap-2' onSubmit={onSubmit}>
        <input
          className={clsx(
            'outline-hidden rounded-lg border px-3 py-2',
            errors.name ? 'border-red-400' : 'border-gray-600',
          )}
          name='name'
          placeholder='이름을 입력해주세요'
          type='text'
          value={values.name || ''}
          onChange={handleChange}
        />
        {errors.name && <p className='text-sm text-red-400'>{errors.name}</p>}
        <button
          className='bg-in-black text-in-white disabled:bg-in-gray-03 rounded-md px-3 py-2 disabled:cursor-not-allowed'
          disabled={!values.name}
          type='submit'
        >
          Submit
        </button>
      </form>
    );
  },
};
