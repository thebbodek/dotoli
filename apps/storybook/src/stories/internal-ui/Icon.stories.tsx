import { Icon } from '@bbodek/internal-ui';
import { icons, IconStyle } from '@phosphor-icons/core';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta = {
  title: 'core/internal-ui/Icon',
  component: Icon,
  argTypes: {
    iconKey: {
      control: 'select',
      options: icons.map((icon) => icon.name),
      description: '@phosphor-icons/web icon name',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: icons.map((icon) => icon.name),
          }),
        },
      },
      type: {
        name: 'string',
        required: true,
      },
    },
    weight: {
      control: 'select',
      options: Object.values(IconStyle),
      description: '@phosphor-icons/web icon weight',
      type: 'string',
      table: {
        defaultValue: {
          summary: IconStyle.BOLD,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(IconStyle),
          }),
        },
      },
    },
    title: {
      control: 'text',
      description: 'icon title',
      type: 'string',
    },
    'aria-hidden': {
      control: 'boolean',
      description: 'icon aria-hidden',
      type: 'boolean',
    },
    className: {
      description: 'className',
      control: 'text',
      type: 'string',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    iconKey: 'baby',
  },
};
