import { TextArea, TEXTAREA_DEFAULT_MAX_LENGTH } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as InputFieldMeta } from './InputField.stories';

const {
  label,
  feedback,
  badge,
  isError,
  required,
  value,
  name,
  onChange,
  regCallback,
  className,
  disabled,
  readOnly,
  hiddenLabel,
  id,
  placeholder,
  ref,
  autoComplete,
} = InputFieldMeta.argTypes ?? {};

const meta = {
  title: 'core/internal-ui/Input/TextArea',
  component: TextArea,
  argTypes: {
    label,
    value,
    onChange,
    feedback,
    badge,
    isError,
    required,
    name,
    regCallback,
    className,
    disabled,
    readOnly,
    hiddenLabel,
    maxLength: {
      control: 'number',
      description: 'TextArea maxLength',
      type: 'number',
      table: {
        defaultValue: {
          summary: `${TEXTAREA_DEFAULT_MAX_LENGTH}`,
        },
      },
    },
    id,
    placeholder,
    ref,
    autoComplete,
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
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
