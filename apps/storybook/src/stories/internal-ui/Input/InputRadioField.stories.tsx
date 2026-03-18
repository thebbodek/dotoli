import { InputRadioField } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent, useState } from 'react';

import { default as inputMeta } from './InputField.stories';

const { hiddenLabel } = inputMeta.argTypes;

const meta = {
  title: 'core/internal-ui/Input/InputRadioField',
  component: InputRadioField,
  argTypes: {
    label: {
      control: 'text',
      description: 'Radio Field label',
      type: {
        required: true,
        name: 'string',
      },
    },
    feedback: {
      control: 'text',
      description: 'feedback',
      type: 'string',
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
    required: {
      control: 'boolean',
      description: 'required',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    hiddenLabel,
  },
  args: {
    label: '생산 방식',
  },
} satisfies Meta<typeof InputRadioField>;

export default meta;

type Story = StoryObj<typeof InputRadioField>;

export const Default: Story = {
  render: (args) => {
    const options = [
      { label: '뽀득', value: 'BBODEK' },
      { label: '위탁', value: 'CONSIGNMENT' },
    ];
    const [value, setValue] =
      useState<(typeof options)[number]['value']>('BBODEK');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value as (typeof options)[number]['value']);
    };

    return (
      <InputRadioField {...args} value={value} onChange={onChange}>
        {options.map((opt) => (
          <InputRadioField.Item
            key={opt.value}
            label={opt.label}
            value={opt.value}
          />
        ))}
      </InputRadioField>
    );
  },
};
