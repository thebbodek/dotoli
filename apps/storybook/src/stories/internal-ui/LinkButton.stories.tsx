import {
  BUTTON_SIZES,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
  LinkButton,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { default as ButtonMeta } from './Button.stories';

const {
  label,
  theme,
  variant,
  size,
  disabled,
  iconKey,
  iconPosition,
  onClick,
} = ButtonMeta.argTypes ?? {};

const meta: Meta<typeof LinkButton> = {
  title: 'core/internal-ui/Button/LinkButton',
  component: LinkButton,
  argTypes: {
    href: {
      description: 'Link Href',
      control: 'text',
      type: {
        required: true,
        name: 'string',
      },
    },
    label,
    theme,
    variant,
    size,
    disabled,
    iconKey,
    iconPosition,
    onClick,
  },
};

export default meta;

type Story = StoryObj<typeof LinkButton>;

export const Link: Story = {
  args: {
    theme: BUTTON_THEMES.PRIMARY,
    variant: BUTTON_VARIANTS.OUTLINED,
    href: 'https://www.bbodek.com',
    label: '뽀득 바로가기',
    size: BUTTON_SIZES.LG,
    disabled: false,
    iconKey: 'arrow-square-out',
  },
};
