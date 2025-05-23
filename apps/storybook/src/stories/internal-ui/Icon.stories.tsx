import { Icon } from '@bbodek/internal-ui';
import { icons, IconStyle } from '@phosphor-icons/core';
import { Meta } from '@storybook/react';

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
          summary: `'${Object.values(icons.map((icon) => icon.name)).join(`' | '`)}'`,
        },
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
