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
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

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
  className,
} = ButtonMeta.argTypes ?? {};

interface LinkButtonArgs
  extends Omit<LinkButtonProps, 'responsive' | 'iconOption'>,
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
    target: {
      description: 'Link Button target',
      table: {
        defaultValue: {
          summary: '_self',
        },
        type: {
          summary: generateArgTypeSummary({
            options: [
              '_self',
              '_blank',
              '_parent',
              '_top',
              'string and object',
            ],
          }),
        },
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
    className,
    ref: {
      description: 'Link Button ref',
      table: {
        type: {
          summary: 'Ref<HTMLAnchorElement>',
        },
      },
    },
    as: {
      description: 'Link Button as',
      table: {
        category: 'LinkProps',
        type: {
          summary: 'Url',
        },
      },
    },
    locale: {
      description: 'Link Button locale',
      table: {
        category: 'LinkProps',
        type: {
          summary: 'string | false',
        },
      },
    },
    onMouseEnter: {
      description: 'Link Button on mouse enter',
      type: 'function',
      table: {
        category: 'LinkProps',
      },
    },
    onNavigate: {
      description: 'Link Button on navigate',
      type: 'function',
      table: {
        category: 'LinkProps',
      },
    },
    onTouchStart: {
      description: 'Link Button on touch start',
      type: 'function',
      table: {
        category: 'LinkProps',
      },
    },
    passHref: {
      description: 'Link Button pass href',
      type: 'boolean',
      table: {
        category: 'LinkProps',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    prefetch: {
      description: 'Link Button prefetch',
      table: {
        category: 'LinkProps',
        type: {
          summary: 'boolean | null',
        },
        defaultValue: {
          summary: '`true` (pages router) or `null` (app router)',
        },
      },
    },
    replace: {
      description: 'Link Button replace',
      type: 'boolean',
      table: {
        category: 'LinkProps',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    scroll: {
      description: 'Link Button scroll',
      type: 'boolean',
      table: {
        category: 'LinkProps',
        defaultValue: {
          summary: 'true',
        },
      },
    },
    shallow: {
      description: 'Link Button shallow',
      type: 'boolean',
      table: {
        category: 'LinkProps',
        defaultValue: {
          summary: 'false',
        },
      },
    },
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
      responsive={getResponsive({
        responsiveMobile,
        responsiveTablet,
        responsiveDesktop,
      })}
      iconOption={{ iconKey }}
      size={size}
    />
  ),
};
