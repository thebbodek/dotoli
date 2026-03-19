import { InputToggleField } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as inputMeta } from './InputField.stories';

const { hiddenLabel } = inputMeta.argTypes;

const meta = {
  title: 'core/internal-ui/Input/InputToggleField',
  component: InputToggleField,
  argTypes: {
    label: {
      control: 'text',
      description: 'Toggle Field label',
      type: {
        required: true,
        name: 'string',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'disabled',
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
    label: '운영 상태',
  },
} satisfies Meta<typeof InputToggleField>;

export default meta;

type Story = StoryObj<typeof InputToggleField>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    const onChange = () => {
      setChecked(!checked);
    };

    return (
      <InputToggleField {...args} onChange={onChange}>
        <InputToggleField.Item label='운영' />
      </InputToggleField>
    );
  },
};
