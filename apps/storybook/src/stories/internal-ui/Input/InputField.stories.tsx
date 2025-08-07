import { Icon, InputField } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const textFieldTypes = ['text', 'email', 'number'];

const meta: Meta<typeof InputField> = {
  title: 'core/internal-ui/Input/InputField',
  component: InputField,
  argTypes: {
    label: {
      control: 'text',
      description: 'Input Field label',
      type: 'string',
    },
    feedback: {
      control: 'text',
      description: 'Input Field feedback',
      type: 'string',
    },
    isError: {
      control: 'boolean',
      description: 'is error',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    type: {
      control: 'select',
      description: 'Input Field type',
      options: textFieldTypes,
      table: {
        defaultValue: {
          summary: `'text'`,
        },
        type: {
          summary: generateArgTypeSummary({ options: textFieldTypes }),
        },
      },
    },
    required: {
      control: 'boolean',
      description: 'Input Field required',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Input Field readOnly',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Input Field disabled',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    placeholder: {
      control: 'text',
      type: 'string',
      description: 'Input Field placeholder',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {},
  render(args) {
    const [value, setValue] = useState('');

    return (
      <InputField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Label',
    type: 'text',
    required: true,
  },
  render(args) {
    const [value, setValue] = useState('');

    return (
      <InputField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const WithBadge: Story = {
  args: {
    label: 'Label',
    type: 'text',
    badge: <Icon iconKey='info' weight='fill' />,
  },
  render(args) {
    const [value, setValue] = useState('');

    return (
      <InputField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const WithFeedback: Story = {
  args: {
    label: 'Label',
    type: 'text',
    required: false,
    isError: false,
    readOnly: false,
    disabled: false,
    feedback: '소문자로 입력해주세요',
  },
  render(args) {
    const [value, setValue] = useState('');
    const regex = /^[a-z]+$/;
    const isError = value.length > 0 && !regex.test(value);

    return (
      <InputField
        {...args}
        value={value}
        onChange={(e) => {
          console.log(e.target.value);
          setValue(e.target.value);
        }}
        feedback={isError ? '소문자로만 입력해주세요' : '소문자로 입력해주세요'}
        isError={isError}
      />
    );
  },
};

export const WithRegexCallback: Story = {
  args: {
    label: 'Label',
    type: 'text',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const NUMERIC_REG_EXP = /[^0-9]/g;
    const replaceNumeric = (str: string) => str.replace(NUMERIC_REG_EXP, '');

    return (
      <InputField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        regCallback={replaceNumeric}
        feedback={'숫자만 입력해주세요'}
      />
    );
  },
};
