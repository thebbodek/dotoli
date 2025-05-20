import { Radio, RADIO_SIZES, RadioProps } from '@bbodek/internal-ui';
import { Meta } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Radio> = {
  title: 'core/internal-ui/Radio',
  component: Radio,
  argTypes: {
    size: {
      description: 'Radio size',
      control: 'select',
      options: Object.values(RADIO_SIZES),
      type: 'string',
      table: {
        defaultValue: {
          summary: RADIO_SIZES.SM,
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
      type: 'boolean',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      description: 'Radio disabled',
      type: 'boolean',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onChange: { action: 'changed' },
  },
  args: {
    size: RADIO_SIZES.SM,
  },
};

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
