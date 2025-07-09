import {
  BUTTON_SIZES,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
  LinkButton,
  LinkButtonProps,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { ButtonArgs, default as ButtonMeta } from './Button.stories';
import { getResponsive } from '@/stories/internal-ui/Button/utils/getResponsive';

const {
  label,
  theme,
  variant,
  size,
  disabled,
  iconKey,
  iconPosition,
  onClick,
  responsiveMobile,
  responsiveTablet,
  responsiveDesktop,
} = ButtonMeta.argTypes ?? {};

interface LinkButtonArgs
  extends LinkButtonProps,
    Pick<
      ButtonArgs,
      'iconKey' | 'responsiveMobile' | 'responsiveTablet' | 'responsiveDesktop'
    > {}

const meta: Meta<LinkButtonArgs> = {
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
    responsiveMobile,
    responsiveTablet,
    responsiveDesktop,
  },
};

export default meta;

type Story = StoryObj<LinkButtonArgs>;

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
  render: ({
    iconKey,
    size,
    responsiveMobile,
    responsiveTablet,
    responsiveDesktop,
    ...args
  }) => (
    <LinkButton
      {...args}
      size={size}
      iconOption={{ iconKey }}
      responsive={getResponsive({
        responsiveMobile,
        responsiveTablet,
        responsiveDesktop,
      })}
    />
  ),
};
