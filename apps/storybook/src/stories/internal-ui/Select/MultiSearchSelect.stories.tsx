import {
  Icon,
  MultiSearchSelect,
  MultiSearchSelectProps,
  MultiSelectBaseValue,
  MultiSelectOption,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const items = [
  '롱롱 어린이집 이건 정말 이름이 긴 어린이집이랍니다~테스트로 봐주세요!',
  '뽀득 어린이집',
  '뽀득 어학원',
  '뽀득 초등학교',
  '뽀득 중학교',
  '뽀득 고등학교',
  '뽀득 대학교',
  '뽀득 대학원',
  '뽀득 연구소',
  '뽀득 연구원',
];

const meta: Meta<typeof MultiSearchSelect> = {
  title: 'core/internal-ui/Select/MultiSearchSelect',
  component: MultiSearchSelect,
  argTypes: {
    label: {
      description: 'MultiSearchSelect label',
      control: 'text',
      type: {
        required: true,
        name: 'string',
      },
    },
    disabled: {
      description: 'MultiSearchSelect disabled',
      control: 'boolean',
      type: 'boolean',
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
      description: 'MultiSearchSelect feedback',
      control: 'text',
      type: 'string',
    },
    required: {
      description: 'MultiSearchSelect required',
      control: 'boolean',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    isError: {
      description: 'MultiSearchSelect error state',
      control: 'boolean',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    placeholder: {
      description: 'MultiSearchSelect placeholder',
      control: 'text',
      type: 'string',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    className: {
      description: 'MultiSearchSelect CSS class name',
      control: 'text',
      type: 'string',
    },
    badge: {
      description: 'MultiSearchSelect label badge',
      control: 'text',
      type: {
        name: 'other',
        value: 'ReactNode',
        required: false,
      },
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    options: {
      description: 'Available options for selection',
      control: 'object',
      type: {
        required: true,
        name: 'other',
        value: 'MultiSelectOption<T>[]',
      },
      table: {
        type: {
          summary: 'MultiSelectOption<T>[]',
        },
      },
    },
    value: {
      description: 'Currently selected values',
      control: 'object',
      type: {
        required: true,
        name: 'other',
        value: 'MultiSelectOption<T>[]',
      },
      table: {
        type: {
          summary: 'MultiSelectOption<T>[]',
        },
      },
    },
    onChange: {
      description: 'Callback function when selection changes',
      control: false,
      type: {
        name: 'function',
        required: true,
      },
      table: {
        type: {
          summary: 'function',
        },
      },
    },
    inputOption: {
      description: 'Search input field options',
      control: 'object',
      type: {
        name: 'other',
        value: 'InputSearchProps',
        required: false,
      },
      table: {
        type: {
          summary: 'InputSearchProps',
        },
      },
    },
    popoverOption: {
      description: 'Popover options',
      control: 'object',
      type: {
        name: 'other',
        value: 'PopoverProps',
        required: false,
      },
      table: {
        type: {
          summary: 'PopoverProps',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MultiSearchSelect>;

export const Default = {
  render: ({
    label = 'Select Label',
    ...args
  }: MultiSearchSelectProps<MultiSelectBaseValue>) => {
    const [value, setValue] = useState<
      MultiSelectOption<MultiSelectBaseValue>[]
    >([]);

    const onChange = (value: MultiSelectOption<MultiSelectBaseValue>[]) =>
      setValue(value as MultiSelectOption<MultiSelectBaseValue>[]);

    return (
      <MultiSearchSelect
        {...args}
        className='w-[15rem]'
        label={label}
        options={items.map((item) => ({
          value: item,
          label: item,
        }))}
        value={value}
        onChange={onChange}
      />
    );
  },
};

export const WithBadge = {
  render: () => {
    const [value, setValue] = useState<
      MultiSelectOption<MultiSelectBaseValue>[]
    >([]);

    const onChange = (value: MultiSelectOption<MultiSelectBaseValue>[]) =>
      setValue(value as MultiSelectOption<MultiSelectBaseValue>[]);

    return (
      <MultiSearchSelect
        className='w-[15rem]'
        label='Select Label'
        options={items.map((item) => ({
          value: item,
          label: item,
        }))}
        value={value}
        onChange={onChange}
        badge={<Icon iconKey='info' weight='fill' />}
      />
    );
  },
};

export const Error: Story = {
  args: {
    isError: true,
    feedback: '에러가 발생했어요.',
  },
  render: ({
    isError,
    feedback,
  }: MultiSearchSelectProps<MultiSelectBaseValue>) => {
    const [value, setValue] = useState<
      MultiSelectOption<MultiSelectBaseValue>[]
    >([]);

    const onChange = (value: MultiSelectOption<MultiSelectBaseValue>[]) =>
      setValue(value as MultiSelectOption<MultiSelectBaseValue>[]);

    return (
      <MultiSearchSelect
        className='w-[15rem]'
        label='Select Label'
        options={items.map((item) => ({
          value: item,
          label: item,
        }))}
        value={value}
        onChange={onChange}
        isError={isError}
        feedback={feedback}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: ({ disabled }: MultiSearchSelectProps<MultiSelectBaseValue>) => {
    const [value, setValue] = useState<
      MultiSelectOption<MultiSelectBaseValue>[]
    >([]);

    const onChange = (value: MultiSelectOption<MultiSelectBaseValue>[]) =>
      setValue(value as MultiSelectOption<MultiSelectBaseValue>[]);

    return (
      <MultiSearchSelect
        className='w-[15rem]'
        label='Select Label'
        options={items.map((item) => ({
          value: item,
          label: item,
        }))}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    );
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
  render: ({ required }: MultiSearchSelectProps<MultiSelectBaseValue>) => {
    const [value, setValue] = useState<
      MultiSelectOption<MultiSelectBaseValue>[]
    >([]);

    const onChange = (value: MultiSelectOption<MultiSelectBaseValue>[]) =>
      setValue(value as MultiSelectOption<MultiSelectBaseValue>[]);

    return (
      <MultiSearchSelect
        className='w-[15rem]'
        label='Select Label'
        options={items.map((item) => ({
          value: item,
          label: item,
        }))}
        value={value}
        onChange={onChange}
        required={required}
      />
    );
  },
};
