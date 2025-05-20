import { ICON_BUTTON_COLORS, IconButton } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof IconButton> = {
  title: 'core/internal-ui/Button/IconButton',
  component: IconButton,
  argTypes: {
    color: {
      description: 'IconButton Color',
      control: 'select',
      options: Object.values(ICON_BUTTON_COLORS),
      table: {
        defaultValue: { summary: ICON_BUTTON_COLORS.GRAY },
      },
    },
    disabled: {
      description: 'IconButton Disabled',
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
