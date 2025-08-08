import { InputPassword } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as InputFieldMeta } from './InputField.stories';

const { label, feedback, isError, required, readOnly, disabled, placeholder } =
  InputFieldMeta.argTypes ?? {};

const meta: Meta<typeof InputPassword> = {
  title: 'core/internal-ui/Input/InputPassword',
  component: InputPassword,
  argTypes: {
    label,
    feedback,
    isError,
    required,
    readOnly,
    disabled,
    placeholder,
    rules: {
      control: {
        type: 'object',
      },
      description: 'Input Password Rules',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputPassword>;

export const Default: Story = {
  args: {
    placeholder: 'placeholder',
  },
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
  args: {
    placeholder: 'placeholder',
  },
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
