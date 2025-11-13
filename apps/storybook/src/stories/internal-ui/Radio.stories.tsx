import { Radio, RADIO_SIZES, RadioProps } from '@bbodek/internal-ui';
import { Meta } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta = {
  title: 'core/internal-ui/Radio',
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

export const Default = {
  render: (args: RadioProps) => {
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

export const WithLabel = {
  args: {
    label: 'Radio',
  },
  render: (args: RadioProps) => {
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

export const Checked = {
  args: {
    label: 'Radio',
    checked: true,
  },
};

export const Disabled = {
  args: {
    label: 'Radio',
    disabled: true,
  },
};
