import { Icon, SelectBase } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';
import { useState } from 'react';

const meta: Meta<typeof SelectBase> = {
  title: 'core/internal-ui/Select/SelectBase',
  component: SelectBase,
  argTypes: {
    trigger: {
      description: 'Select trigger',
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
    popoverOption: {
      control: 'object',
      description: 'Select popover option',
    },
    label: {
      control: 'text',
      description: 'Select label',
      type: {
        required: true,
        name: 'string',
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
};

export default meta;

type Story = StoryObj<typeof SelectBase>;

export const Default = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const showPlaceholder = !value;

    return (
      <SelectBase
        className='w-[15rem]'
        label={<SelectBase.Label>Select Label</SelectBase.Label>}
        trigger={
          <SelectBase.Trigger>
            <button
              type='button'
              className={clsx(
                'text-body-16-r truncate text-black',
                showPlaceholder && 'text-gray-04',
              )}
            >
              {value || 'Placeholder'}
            </button>
          </SelectBase.Trigger>
        }
      >
        <SelectBase.PopoverWrapper className='h-[24vh] p-1'>
          <SelectBase.List>
            {Array.from({ length: 10 }, (_, idx) => (
              <SelectBase.Item
                key={idx}
                onSelect={() => {
                  setValue(String(idx));
                }}
                selected={value === String(idx)}
              >
                {idx}
              </SelectBase.Item>
            ))}
          </SelectBase.List>
        </SelectBase.PopoverWrapper>
      </SelectBase>
    );
  },
};

export const WithBadge = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const showPlaceholder = !value;

    return (
      <SelectBase
        className='w-[15rem]'
        disabled
        label={
          <SelectBase.Label badge={<Icon iconKey='info' weight='fill' />}>
            Select Label
          </SelectBase.Label>
        }
        trigger={
          <SelectBase.Trigger>
            <button
              type='button'
              className={clsx(
                'text-body-16-r truncate text-black disabled:cursor-not-allowed',
                showPlaceholder && 'text-gray-04',
              )}
            >
              {value || 'Placeholder'}
            </button>
          </SelectBase.Trigger>
        }
      >
        <SelectBase.PopoverWrapper className='h-[24vh] p-1'>
          <SelectBase.List>
            {Array.from({ length: 10 }, (_, idx) => (
              <SelectBase.Item
                key={idx}
                onSelect={() => {
                  setValue(String(idx));
                }}
                selected={value === String(idx)}
              >
                {idx}
              </SelectBase.Item>
            ))}
          </SelectBase.List>
        </SelectBase.PopoverWrapper>
      </SelectBase>
    );
  },
};

export const Error: Story = {
  args: {
    isError: true,
  },
  render: ({ isError }) => {
    const [value, setValue] = useState<string | null>(null);
    const showPlaceholder = !value;

    return (
      <SelectBase
        className='w-[15rem]'
        label={<SelectBase.Label>Select Label</SelectBase.Label>}
        trigger={
          <SelectBase.Trigger>
            <button
              type='button'
              className={clsx(
                'text-body-16-r truncate text-black disabled:cursor-not-allowed',
                showPlaceholder && 'text-gray-04',
              )}
            >
              {value || 'Placeholder'}
            </button>
          </SelectBase.Trigger>
        }
        feedback='에러가 발생했습니다.'
        isError={isError}
      >
        <SelectBase.PopoverWrapper className='h-[24vh] p-1'>
          <SelectBase.List>
            {Array.from({ length: 10 }, (_, idx) => (
              <SelectBase.Item
                key={idx}
                onSelect={() => {
                  setValue(String(idx));
                }}
                selected={value === String(idx)}
              >
                {idx}
              </SelectBase.Item>
            ))}
          </SelectBase.List>
        </SelectBase.PopoverWrapper>
      </SelectBase>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: ({ disabled }) => {
    const [value, setValue] = useState<string | null>(null);
    const showPlaceholder = !value;

    return (
      <SelectBase
        className='w-[15rem]'
        label={<SelectBase.Label>Select Label</SelectBase.Label>}
        trigger={
          <SelectBase.Trigger>
            <button
              type='button'
              className={clsx(
                'text-body-16-r truncate text-black disabled:cursor-not-allowed',
                (showPlaceholder || disabled) && 'text-gray-04',
              )}
              disabled={disabled}
            >
              {value || 'Placeholder'}
            </button>
          </SelectBase.Trigger>
        }
        disabled={disabled}
      >
        <SelectBase.PopoverWrapper className='h-[24vh] p-1'>
          <SelectBase.List>
            {Array.from({ length: 10 }, (_, idx) => (
              <SelectBase.Item
                key={idx}
                onSelect={() => {
                  setValue(String(idx));
                }}
                selected={value === String(idx)}
              >
                {idx}
              </SelectBase.Item>
            ))}
          </SelectBase.List>
        </SelectBase.PopoverWrapper>
      </SelectBase>
    );
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
  render: ({ required }) => {
    const [value, setValue] = useState<string | null>(null);
    const showPlaceholder = !value;

    return (
      <SelectBase
        className='w-[15rem]'
        label={<SelectBase.Label>Select Label</SelectBase.Label>}
        trigger={
          <SelectBase.Trigger>
            <button
              type='button'
              className={clsx(
                'text-body-16-r truncate text-black disabled:cursor-not-allowed',
                showPlaceholder && 'text-gray-04',
              )}
            >
              {value || 'Placeholder'}
            </button>
          </SelectBase.Trigger>
        }
        required={required}
      >
        <SelectBase.PopoverWrapper className='h-[24vh] p-1'>
          <SelectBase.List>
            {Array.from({ length: 10 }, (_, idx) => (
              <SelectBase.Item
                key={idx}
                onSelect={() => {
                  setValue(String(idx));
                }}
                selected={value === String(idx)}
              >
                {idx}
              </SelectBase.Item>
            ))}
          </SelectBase.List>
        </SelectBase.PopoverWrapper>
      </SelectBase>
    );
  },
};
