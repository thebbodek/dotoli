import {
  Sort,
  SortOnSelectParams,
  SortProps,
  SortValue,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as selectMeta } from './Select/Select.stories';

const { onSelect, popoverOption, disabled, label, className } =
  selectMeta.argTypes;

const meta = {
  title: 'core/internal-ui/Sort',
  component: Sort,
  argTypes: {
    value: {
      control: 'text',
      description: 'Sort current value',
      table: {
        type: {
          summary: 'string | null',
        },
      },
      type: {
        required: true,
        name: 'other',
        value: 'string | null',
      },
    },
    displayValue: {
      control: 'text',
      description: 'Sort current display value',
      table: {
        type: {
          summary: 'string | null',
        },
      },
      type: {
        required: true,
        name: 'other',
        value: 'string | null',
      },
    },
    label,
    className,
    disabled,
    onSelect,
    popoverOption,
  },
} satisfies Meta<typeof Sort>;

export default meta;

type Story = StoryObj<typeof Sort>;

export const Default: Story = {
  render: (args: SortProps) => {
    const [value, setValue] = useState<SortValue>('등록일 순');
    const data = ['등록일 순', '서비스 시작일 (첫 배송일) 순', '해지일 순'];

    const onSelect = ({ value }: SortOnSelectParams<SortValue>) => {
      setValue(value);
    };

    return (
      <Sort
        className='w-[15rem]'
        {...args}
        value={value}
        onSelect={onSelect}
        displayValue={value}
      >
        {data.map((label) => (
          <Sort.Item key={label} value={String(label)} label={label}>
            {label}
          </Sort.Item>
        ))}
      </Sort>
    );
  },
};
