import {
  Icon,
  Select,
  SelectProps,
  SelectValue,
  SingleSelectOnSelectParams,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Select> = {
  title: 'core/internal-ui/Select/Select',
  component: Select,
  argTypes: {
    label: {
      control: 'text',
      description: 'Select label',
      type: {
        required: true,
        name: 'string',
      },
    },
    popoverOption: {
      control: 'object',
      description: 'Select popover option',
    },
    badge: {
      description: 'Select Label Badge',
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
      description: 'Select placeholder',
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
      description: 'Select disabled',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    required: {
      control: 'boolean',
      description: 'Select required',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    feedback: {
      control: 'text',
      description: 'Select feedback',
      type: 'string',
    },
    value: {
      control: 'text',
      description: 'Select current value',
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
      description: 'Select current display value',
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
      action: 'clicked',
      description: 'Select on select',
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
  },
};

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
        value={value}
        onSelect={onSelect}
        displayValue={value}
      >
        {Array.from({ length: 2 }, (_, idx) => (
          <Select.Item key={idx} value={String(idx)} label={String(idx)}>
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
        className='w-[15rem]'
        label='Select Label'
        value={value}
        onSelect={onSelect}
        displayValue={value}
        badge={<Icon iconKey='info' weight='fill' />}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <Select.Item key={idx} value={String(idx)} label={String(idx)}>
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
        label='Select Label'
        value={value}
        onSelect={onSelect}
        displayValue={value}
        isError={isError}
        feedback={feedback}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <Select.Item key={idx} value={String(idx)} label={String(idx)}>
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
        label='Select Label'
        value={value}
        onSelect={onSelect}
        displayValue={value}
        disabled={disabled}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <Select.Item key={idx} value={String(idx)} label={String(idx)}>
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
        label='Select Label'
        value={value}
        onSelect={onSelect}
        displayValue={value}
        required={required}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <Select.Item key={idx} value={String(idx)} label={String(idx)}>
            {idx}
          </Select.Item>
        ))}
      </Select>
    );
  },
};
