import { TextArea } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as InputFieldMeta } from './InputField.stories';

const { label, feedback, error, required, readOnly, disabled, placeholder } =
  InputFieldMeta.argTypes ?? {};

const meta: Meta<typeof TextArea> = {
  title: 'core/internal-ui/Input/TextArea',
  component: TextArea,
  argTypes: {
    label,
    feedback,
    error,
    required,
    readOnly,
    disabled,
    placeholder,
    maxLength: {
      control: 'number',
      description: 'TextArea maxLength',
      type: 'number',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: 'placeholder',
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <TextArea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='w-[300px]'
      />
    );
  },
};

export const WithMaxLength: Story = {
  args: {
    placeholder: 'placeholder',
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <TextArea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='w-[300px]'
        maxLength={100}
      />
    );
  },
};
