import { ICON_BUTTON_COLORS, IconButton } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';

import { default as IconMeta } from './Icon.stories';

const { iconKey } = IconMeta.argTypes ?? {};

const meta: Meta<typeof IconButton> = {
  title: 'core/internal-ui/Button/IconButton',
  component: IconButton,
  argTypes: {
    color: {
      description: 'Icon Button Color',
      control: 'select',
      options: Object.values(ICON_BUTTON_COLORS),
      table: {
        defaultValue: { summary: ICON_BUTTON_COLORS.GRAY },
      },
    },
    iconKey,
    disabled: {
      description: 'Icon Button Disabled',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    color: ICON_BUTTON_COLORS.GRAY,
    disabled: false,
    iconKey: 'plus',
  },
};
