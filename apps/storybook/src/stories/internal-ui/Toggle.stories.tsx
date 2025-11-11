import { COLOR_VARIANTS, Toggle, TOGGLE_SIZES } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const labelColorOptions = Object.values(COLOR_VARIANTS).filter(
  (color) => color === COLOR_VARIANTS.BLACK || color === COLOR_VARIANTS.GRAY_06,
);

const meta = {
  title: 'core/internal-ui/Toggle',
  component: Toggle,
  argTypes: {
    size: {
      description: 'Toggle size',
      control: 'select',
      options: Object.values(TOGGLE_SIZES),
      table: {
        defaultValue: {
          summary: TOGGLE_SIZES.SM,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(TOGGLE_SIZES),
          }),
        },
      },
    },
    label: {
      description: 'Toggle label',
      control: 'text',
      type: 'string',
    },
    labelColor: {
      description: 'Toggle label color',
      control: 'select',
      options: labelColorOptions,
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: labelColorOptions,
          }),
        },
        defaultValue: {
          summary: COLOR_VARIANTS.BLACK,
        },
      },
    },
    labelClassName: {
      description: 'Toggle label className',
      control: 'text',
      type: 'string',
    },
    checked: {
      description: 'Toggle checked',
      control: 'boolean',
      type: {
        name: 'boolean',
        required: true,
      },
    },
    disabled: {
      description: 'Toggle disabled',
      control: 'boolean',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onChange: {
      action: 'changed',
      type: {
        name: 'function',
        required: true,
      },
    },
  },
  args: {
    size: TOGGLE_SIZES.SM,
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <Toggle
        {...args}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    );
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Toggle',
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <Toggle
        {...args}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    );
  },
};

export const Checked: Story = {
  args: {
    label: 'Toggle',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Toggle',
    disabled: true,
  },
};
