import { Icon } from '@bbodek/internal-ui';
import { icons, IconStyle } from '@phosphor-icons/core';
import { Meta } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgType';

const meta: Meta<typeof Icon> = {
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
        required: true,
        name: 'string',
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
  },
};

export default meta;

export const Default = {
  args: {
    iconKey: 'baby',
  },
};
