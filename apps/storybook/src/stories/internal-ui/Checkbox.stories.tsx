import { Checkbox, CHECKBOX_SIZES } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta = {
  title: 'core/internal-ui/Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      description: 'Checkbox size',
      control: 'select',
      options: Object.values(CHECKBOX_SIZES),
      table: {
        defaultValue: {
          summary: CHECKBOX_SIZES.SM,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(CHECKBOX_SIZES),
          }),
        },
      },
    },
    label: {
      description: 'Checkbox label',
      control: 'text',
      type: 'string',
    },
    checked: {
      description: 'Checkbox checked',
      control: 'boolean',
      type: {
        name: 'boolean',
        required: true,
      },
    },
    disabled: {
      description: 'Checkbox disabled',
      control: 'boolean',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onChange: {
      type: {
        name: 'function',
        required: true,
      },
    },
  },
  args: {
    size: CHECKBOX_SIZES.SM,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    );
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Checkbox',
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    );
  },
};

export const Checked: Story = {
  args: {
    label: 'Checkbox',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Checkbox',
    disabled: true,
  },
};
