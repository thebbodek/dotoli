import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';
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
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    checked: {
      description: 'Checkbox checked',
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
      description: 'Checkbox disabled',
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
    },
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
