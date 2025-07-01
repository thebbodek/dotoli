import { InputSearch } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as InputFieldMeta } from './InputField.stories';

const { label, feedback, isError, required, readOnly, disabled, placeholder } =
  InputFieldMeta.argTypes ?? {};

const meta: Meta<typeof InputSearch> = {
  title: 'core/internal-ui/Input/InputSearch',
  component: InputSearch,
  argTypes: {
    label,
    feedback,
    isError,
    required,
    readOnly,
    disabled,
    placeholder,
  },
};

export default meta;

type Story = StoryObj<typeof InputSearch>;

export const Default: Story = {
  args: {
    placeholder: 'placeholder',
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <InputSearch
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rootClassName='w-[300px]'
      />
    );
  },
};

export const WithSubmit: Story = {
  args: {
    placeholder: 'placeholder',
  },
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
        rootClassName='w-[300px]'
      />
    );
  },
};
