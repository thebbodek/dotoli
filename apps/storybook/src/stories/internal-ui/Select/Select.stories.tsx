import {
  Icon,
  Select,
  SelectProps,
  SelectValue,
  SingleSelectOnSelectParams,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as inputMeta } from '../Input/InputField.stories';

const { hiddenLabel } = inputMeta.argTypes;

const meta = {
  title: 'core/internal-ui/Select/Select',
  component: Select,
  argTypes: {
    label: {
      control: 'text',
      description: 'label',
      type: {
        required: true,
        name: 'string',
      },
    },
    popoverOption: {
      description: 'Popover options',
      control: 'object',
      table: {
        type: {
          summary: 'PopoverProps',
        },
      },
    },
    badge: {
      description: 'Label Badge',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
      type: {
        name: 'other',
        value: 'ReactNode',
        required: false,
      },
    },
    placeholder: {
      control: 'text',
      description: 'placeholder',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    isError: {
      control: 'boolean',
      description: 'is error',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'disabled',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    required: {
      control: 'boolean',
      description: 'required',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    feedback: {
      control: 'text',
      description: 'feedback',
      type: 'string',
    },
    value: {
      control: 'text',
      description: 'current value',
      table: {
        type: {
          summary: 'string | number | null',
        },
      },
      type: {
        required: true,
        name: 'other',
        value: 'string | number | null',
      },
    },
    displayValue: {
      control: 'text',
      description: 'current display value',
      table: {
        type: {
          summary: 'string | number | null',
        },
      },
      type: {
        required: true,
        name: 'other',
        value: 'string | number | null',
      },
    },
    onSelect: {
      description: 'on select',
      table: {
        type: {
          summary: 'function',
        },
      },
      type: {
        required: true,
        name: 'function',
      },
    },
    useReset: {
      control: 'boolean',
      description: 'use reset button',
      table: {
        defaultValue: {
          summary: 'true',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    className: {
      description: 'className',
      control: 'text',
      type: 'string',
    },
    hiddenLabel,
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select>;

export const Default = {
  render: ({ label = 'Select Label', ...args }: SelectProps<string>) => {
    const [value, setValue] = useState<string>('');

    const onSelect = ({ value }: SingleSelectOnSelectParams<string>) => {
      setValue(value);
    };

    return (
      <Select
        className='w-[15rem]'
        label={label}
        {...args}
        displayValue={value}
        value={value}
        onSelect={onSelect}
      >
        {Array.from({ length: 2 }, (_, idx) => (
          <Select.Item key={idx} label={String(idx)} value={String(idx)}>
            {idx}
          </Select.Item>
        ))}
      </Select>
    );
  },
};

export const WithBadge = {
  render: () => {
    const [value, setValue] = useState<string>('');

    const onSelect = ({ value }: SingleSelectOnSelectParams<string>) => {
      setValue(value);
    };

    return (
      <Select
        badge={<Icon iconKey='info' weight='fill' />}
        className='w-[15rem]'
        displayValue={value}
        label='Select Label'
        value={value}
        onSelect={onSelect}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <Select.Item key={idx} label={String(idx)} value={String(idx)}>
            {idx}
          </Select.Item>
        ))}
      </Select>
    );
  },
};

export const Error: Story = {
  args: {
    isError: true,
    feedback: '에러가 발생했어요.',
  },
  render: ({ isError, feedback }: SelectProps<SelectValue>) => {
    const [value, setValue] = useState<string>('');

    const onSelect = ({ value }: SingleSelectOnSelectParams<string>) => {
      setValue(value);
    };

    return (
      <Select
        className='w-[15rem]'
        displayValue={value}
        feedback={feedback}
        isError={isError}
        label='Select Label'
        value={value}
        onSelect={onSelect}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <Select.Item key={idx} label={String(idx)} value={String(idx)}>
            {idx}
          </Select.Item>
        ))}
      </Select>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: ({ disabled }: SelectProps<SelectValue>) => {
    const [value, setValue] = useState<string>('');

    const onSelect = ({ value }: SingleSelectOnSelectParams<string>) => {
      setValue(value);
    };

    return (
      <Select
        className='w-[15rem]'
        disabled={disabled}
        displayValue={value}
        label='Select Label'
        value={value}
        onSelect={onSelect}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <Select.Item key={idx} label={String(idx)} value={String(idx)}>
            {idx}
          </Select.Item>
        ))}
      </Select>
    );
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
  render: ({ required }: SelectProps<SelectValue>) => {
    const [value, setValue] = useState<string>('');

    const onSelect = ({ value }: SingleSelectOnSelectParams<string>) => {
      setValue(value);
    };

    return (
      <Select
        className='w-[15rem]'
        displayValue={value}
        label='Select Label'
        required={required}
        value={value}
        onSelect={onSelect}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <Select.Item key={idx} label={String(idx)} value={String(idx)}>
            {idx}
          </Select.Item>
        ))}
      </Select>
    );
  },
};
