import { InputPassword } from '@bbodek/internal-ui';
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
  title: 'core/internal-ui/Input/InputPassword',
  component: InputPassword,
  argTypes: {
    rules: {
      control: {
        type: 'object',
      },
      description: 'Input Password Rules',
    },
    label,
    value,
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
    onChange,
    regCallback,
    id,
    placeholder,
    ref,
  },
} satisfies Meta<typeof InputPassword>;

export default meta;

type Story = StoryObj<typeof InputPassword>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <div className='popover-root'>
        <InputPassword
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='w-[300px]'
        />
      </div>
    );
  },
};

export const WithRule: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const isError = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

    return (
      <InputPassword
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='w-[300px]'
        isError={isError}
        feedback={isError ? '특수문자는 작성할 수 없어요' : ''}
        rules={{
          length: {
            message: '8자 이상 입력해주세요',
            regex: /^.{8,}$/,
          },
          number: {
            message: '숫자를 포함해주세요',
            regex: /[0-9]/,
          },
        }}
      />
    );
  },
};
