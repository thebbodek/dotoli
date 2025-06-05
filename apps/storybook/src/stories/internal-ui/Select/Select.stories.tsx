import { Icon, Select, SelectProps } from '@bbodek/internal-ui';
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
    value: {
      control: 'text',
      description: 'Select value',
      table: {
        type: {
          summary: 'string | null | number',
        },
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
        required: true,
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
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    required: {
      control: 'boolean',
      description: 'Select required',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    feedback: {
      control: 'text',
      description: 'Select feedback',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
  args: {
    label: 'Select Label',
    placeholder: 'Placeholder',
    className: 'w-[15rem]',
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default = {
  render: (args: SelectProps) => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Select {...args} value={value}>
        {Array.from({ length: 10 }, (_, idx) => (
          <Select.Item
            key={idx}
            onSelect={() => {
              setValue(String(idx));
            }}
            selected={value === String(idx)}
          >
            {idx}
          </Select.Item>
        ))}
      </Select>
    );
  },
};

export const WithBadge: Story = {
  args: {
    badge: <Icon iconKey='info' weight='fill' />,
  },
  render: ({ badge, placeholder, className }) => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Select
        className={className}
        label='Select Label'
        value={value}
        badge={badge}
        placeholder={placeholder}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <Select.Item
            key={idx}
            onSelect={() => {
              setValue(String(idx));
            }}
            selected={value === String(idx)}
          >
            {idx}
          </Select.Item>
        ))}
        z
      </Select>
    );
  },
};

export const Error: Story = {
  args: {
    isError: true,
    feedback: '에러가 발생했어요.',
  },
  render: ({ isError, feedback, placeholder, className }) => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Select
        className={className}
        label='Select Label'
        value={value}
        isError={isError}
        feedback={feedback}
        placeholder={placeholder}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <Select.Item
            key={idx}
            onSelect={() => {
              setValue(String(idx));
            }}
            selected={value === String(idx)}
          >
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
  render: ({ disabled, placeholder, className }) => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Select
        className={className}
        label='Select Label'
        value={value}
        disabled={disabled}
        placeholder={placeholder}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <Select.Item
            key={idx}
            onSelect={() => {
              setValue(String(idx));
            }}
            selected={value === String(idx)}
          >
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
  render: ({ required, placeholder, className }) => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Select
        className={className}
        label='Select Label'
        value={value}
        required={required}
        placeholder={placeholder}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <Select.Item
            key={idx}
            onSelect={() => {
              setValue(String(idx));
            }}
            selected={value === String(idx)}
          >
            {idx}
          </Select.Item>
        ))}
      </Select>
    );
  },
};
