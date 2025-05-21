import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';
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
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    checked: {
      description: 'Toggle checked',
      control: 'boolean',
      type: {
        name: 'boolean',
        required: true,
      },
      table: {
        type: {
          summary: 'true | false',
        },
      },
    },
    disabled: {
      description: 'Toggle disabled',
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
      action: 'changed',
      type: {
        name: 'function',
        required: true,
      },
      table: {
        type: {
          summary: 'function',
        },
      },
    },
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
