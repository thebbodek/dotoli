import { Checkbox, CHECKBOX_SIZES, CheckboxProps } from '@bbodek/internal-ui';
import { Meta } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'core/internal-ui/Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      description: 'Checkbox size',
      control: 'select',
      options: Object.values(CHECKBOX_SIZES),
      type: 'string',
      table: {
        defaultValue: {
          summary: CHECKBOX_SIZES.SM,
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
      type: 'boolean',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      description: 'Checkbox disabled',
      type: 'boolean',
      control: 'boolean',
      able: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onChange: { action: 'changed' },
  },
  args: {
    size: CHECKBOX_SIZES.SM,
  },
};

export default meta;

export const Default = {
  render: (args: CheckboxProps) => {
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

export const WithLabel = {
  args: {
    label: 'Checkbox',
  },
  render: (args: CheckboxProps) => {
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

export const Checked = {
  args: {
    label: 'Checkbox',
    checked: true,
  },
};

export const Disabled = {
  args: {
    label: 'Checkbox',
    disabled: true,
  },
};
