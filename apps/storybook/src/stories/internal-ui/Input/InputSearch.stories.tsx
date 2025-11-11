import { InputSearch } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as InputFieldMeta } from './InputField.stories';

const {
  label,
  hiddenLabel,
  feedback,
  badge,
  isError,
  required,
  className,
  value,
  name,
  autoComplete,
  disabled,
  readOnly,
  maxLength,
  onChange,
  regCallback,
  id,
  placeholder,
  ref,
} = InputFieldMeta.argTypes ?? {};

const meta = {
  title: 'core/internal-ui/Input/InputSearch',
  component: InputSearch,
  argTypes: {
    label,
    value,
    onChange,
    onSubmit: {
      action: 'submit',
      description: 'Input Search onSubmit',
      type: 'function',
    },
    hiddenLabel,
    feedback,
    badge,
    isError,
    required,
    className,
    name,
    autoComplete,
    disabled,
    readOnly,
    maxLength,
    regCallback,
    id,
    placeholder,
    ref,
  },
} satisfies Meta<typeof InputSearch>;

export default meta;

type Story = StoryObj<typeof InputSearch>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <InputSearch
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='w-[300px]'
      />
    );
  },
};

export const WithSubmit: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <InputSearch
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          alert('submit!');
        }}
        className='w-[300px]'
      />
    );
  },
};
