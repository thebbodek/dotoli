import { InputCheckboxField } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent, useMemo, useState } from 'react';

import { default as inputMeta } from './InputField.stories';

const { hiddenLabel } = inputMeta.argTypes;

const OPTION_ITEMS = [
  { label: '옵션이 들어갑니다 1', value: 'OPTION_1' },
  { label: '옵션이 들어갑니다 2', value: 'OPTION_2' },
  { label: '옵션이 들어갑니다 3', value: 'OPTION_3' },
  { label: '옵션이 들어갑니다 4', value: 'OPTION_4' },
] as const;

type OptionValue = (typeof OPTION_ITEMS)[number]['value'];

const meta = {
  title: 'core/internal-ui/Input/InputCheckboxField',
  component: InputCheckboxField,
  argTypes: {
    label: {
      control: 'text',
      description: 'Checkbox Field label',
      type: {
        required: true,
        name: 'string',
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
} satisfies Meta<typeof InputCheckboxField>;

export default meta;

type Story = StoryObj<typeof InputCheckboxField>;

export const Default: Story = {
  render: (args) => {
    const [values, setValues] = useState<OptionValue[]>([
      'OPTION_1',
      'OPTION_2',
    ]);

    const optionValueSet = useMemo(
      () => new Set<OptionValue>(OPTION_ITEMS.map((item) => item.value)),
      [],
    );

    const isOptionValue = (value: string): value is OptionValue =>
      optionValueSet.has(value as OptionValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = e.target;

      if (!isOptionValue(value)) return;

      setValues((prev) => {
        if (!checked) return prev.filter((v) => v !== value);

        if (prev.includes(value)) return prev;

        return [...prev, value];
      });
    };

    return (
      <InputCheckboxField {...args} values={values} onChange={onChange}>
        {OPTION_ITEMS.map((opt) => (
          <InputCheckboxField.Item
            key={opt.value}
            label={opt.label}
            value={opt.value}
          />
        ))}
      </InputCheckboxField>
    );
  },
};
