import {
  Icon,
  INPUT_DEFAULT_MAX_LENGTH,
  InputField,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const textFieldTypes = ['text', 'email', 'number'];

const meta = {
  title: 'core/internal-ui/Input/InputField',
  component: InputField,
  argTypes: {
    label: {
      control: 'text',
      description: 'Input Field label',
      type: {
        name: 'string',
        required: true,
      },
    },
    value: {
      control: 'text',
      description: 'input value',
      type: {
        name: 'other',
        value: 'string | number | readonly string[] | undefined',
        required: true,
      },
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: ['string', 'number', 'readonly string array', 'undefined'],
          }),
        },
      },
    },
    onChange: {
      action: 'onChange',
      type: 'function',
      description: 'input onChange',
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
    badge: {
      control: 'object',
      description: 'input label badge',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    hiddenLabel: {
      control: 'boolean',
      description: 'hidden label',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    className: {
      control: 'text',
      description: 'input className',
      type: 'string',
    },
    type: {
      control: 'select',
      description: 'Input Field type',
      options: textFieldTypes,
      table: {
        defaultValue: {
          summary: 'text',
        },
        type: {
          summary: generateArgTypeSummary({ options: textFieldTypes }),
        },
      },
    },
    id: {
      control: 'text',
      description: 'input id',
      type: 'string',
    },
    placeholder: {
      control: 'text',
      type: 'string',
      description: 'Input Field placeholder',
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
    name: {
      control: 'text',
      description: 'input name',
      type: 'string',
    },
    autoComplete: {
      control: 'text',
      description: 'input auto complete',
      type: 'string',
    },
    ref: {
      description: 'input ref',
      table: {
        type: {
          summary: 'Ref<HTMLInputElement>',
        },
      },
    },
    maxLength: {
      control: 'number',
      description: 'input max length',
      type: 'number',
      table: {
        defaultValue: {
          summary: `${INPUT_DEFAULT_MAX_LENGTH}`,
        },
      },
    },
    regCallback: {
      action: 'regCallback',
      description: 'input reg callback',
      type: 'function',
    },
  },
  args: {
    label: 'Label',
    type: 'text',
  },
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  render(args) {
    const [value, setValue] = useState('');

    return (
      <>
        <InputField
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </>
    );
  },
};

export const WithLabel: Story = {
  args: {
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
          setValue(e.target.value);
        }}
        feedback={isError ? '소문자로만 입력해주세요' : '소문자로 입력해주세요'}
        isError={isError}
      />
    );
  },
};

export const WithRegexCallback: Story = {
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
