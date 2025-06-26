import { ICON_BUTTON_THEMES, IconButton } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';

import { default as IconMeta } from '@/stories/internal-ui/Icon.stories';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';
import { default as ButtonMeta } from './Button.stories';

const { disabled, onClick, type, isPending } = ButtonMeta.argTypes ?? {};
const { iconKey } = IconMeta.argTypes ?? {};

const meta: Meta<typeof IconButton> = {
  title: 'core/internal-ui/Button/IconButton',
  component: IconButton,
  argTypes: {
    theme: {
      description: 'Icon Button Theme',
      control: 'select',
      options: Object.values(ICON_BUTTON_THEMES),
      table: {
        defaultValue: { summary: ICON_BUTTON_THEMES.HOVER_GRAY },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(ICON_BUTTON_THEMES),
          }),
        },
      },
    },
    arialLabel: {
      description: 'Icon Button Aria Label',
      control: 'text',
      type: {
        required: true,
        name: 'string',
      },
    },
    tooltipContent: {
      description: 'Icon Button Tooltip Content',
      control: 'text',
    },
    iconKey,
    type,
    disabled,
    isPending,
    onClick,
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    theme: ICON_BUTTON_THEMES.HOVER_GRAY,
    disabled: false,
    iconKey: 'pencil',
    arialLabel: '수정',
  },
};
