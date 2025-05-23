import { Toggle, TOGGLE_SIZES, ToggleProps } from '@bbodek/internal-ui';
import { Meta } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Toggle> = {
  title: 'core/internal-ui/Toggle',
  component: Toggle,
  argTypes: {
    size: {
      description: 'Toggle size',
      control: 'select',
      options: Object.values(TOGGLE_SIZES),
      type: 'string',
      table: {
        defaultValue: {
          summary: TOGGLE_SIZES.SM,
        },
        type: {
          summary: `'${Object.values(TOGGLE_SIZES).join("' | '")}'`,
        },
      },
    },
    label: {
      description: 'Toggle label',
      control: 'text',
      type: 'string',
    },
    checked: {
      description: 'Toggle checked',
      type: 'boolean',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      description: 'Toggle disabled',
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
    size: TOGGLE_SIZES.SM,
  },
};

export default meta;

export const Default = {
  render: (args: ToggleProps) => {
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

export const WithLabel = {
  args: {
    label: 'Toggle',
  },
  render: (args: ToggleProps) => {
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

export const Checked = {
  args: {
    label: 'Toggle',
    checked: true,
  },
};

export const Disabled = {
  args: {
    label: 'Toggle',
    disabled: true,
  },
};
