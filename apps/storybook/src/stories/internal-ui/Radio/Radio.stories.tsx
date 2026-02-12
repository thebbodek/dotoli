import { Radio, RADIO_SIZES, RadioProps } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta = {
  title: 'core/internal-ui/Radio/Radio',
  component: Radio,
  argTypes: {
    size: {
      description: 'Radio size',
      control: 'select',
      options: Object.values(RADIO_SIZES),
      table: {
        defaultValue: {
          summary: RADIO_SIZES.SM,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(RADIO_SIZES),
          }),
        },
      },
    },
    label: {
      description: 'Radio label',
      control: 'text',
      type: 'string',
    },
    checked: {
      description: 'Radio checked',
      control: 'boolean',
      type: {
        name: 'boolean',
        required: true,
      },
    },
    disabled: {
      description: 'Radio disabled',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'true | false',
        },
      },
    },
    onChange: {
      description: 'Radio onChange',
      type: {
        name: 'function',
        required: true,
      },
    },
    className: {
      description: 'Radio className',
      control: 'text',
      type: 'string',
    },
  },
  args: {
    size: RADIO_SIZES.SM,
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<RadioProps>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <Radio
        {...args}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    );
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Radio',
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <Radio
        {...args}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    );
  },
};

export const Checked: Story = {
  args: {
    label: 'Radio',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Radio',
    disabled: true,
  },
};
