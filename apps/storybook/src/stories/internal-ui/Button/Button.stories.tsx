import {
  Button,
  BUTTON_ICON_POSITIONS,
  BUTTON_SIZES,
  BUTTON_STYLES,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
  ButtonProps,
  ButtonSize,
  ButtonTheme,
  ButtonVariant,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';

import { getResponsive } from './utils/getResponsive';
import { default as IconMeta } from '@/stories/internal-ui/Icon.stories';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const { iconKey: iconKeyArgType } = IconMeta.argTypes ?? {};

const BUTTON_TYPES = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  RESET: 'reset',
} as const;

export interface ButtonArgs
  extends Omit<ButtonProps, 'iconOption' | 'responsive'> {
  iconKey: NonNullable<ButtonProps['iconOption']>['iconKey'];
  responsiveMobile: ButtonSize;
  responsiveTablet: ButtonSize;
  responsiveDesktop: ButtonSize;
}

const meta = {
  title: 'core/internal-ui/Button/Button',
  component: Button,
  argTypes: {
    label: {
      description: 'Button Label',
      control: 'text',
      type: {
        required: true,
        name: 'string',
      },
    },
    type: {
      description: 'Button Type',
      control: 'select',
      options: Object.values(BUTTON_TYPES),
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(BUTTON_TYPES),
          }),
        },
        defaultValue: { summary: BUTTON_TYPES.BUTTON },
      },
    },
    variant: {
      description: 'Button Variant',
      options: Object.values(BUTTON_VARIANTS),
      control: 'select',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(BUTTON_VARIANTS),
          }),
        },
        defaultValue: { summary: BUTTON_VARIANTS.FILLED },
      },
    },
    theme: {
      description: 'Button Theme',
      control: 'select',
      options: Object.values(BUTTON_THEMES),
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(BUTTON_THEMES),
          }),
        },
        defaultValue: { summary: BUTTON_THEMES.PRIMARY },
      },
    },
    size: {
      description: 'Button Size',
      control: 'select',
      options: Object.values(BUTTON_SIZES),
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(BUTTON_SIZES),
          }),
        },
        defaultValue: { summary: BUTTON_SIZES.LG },
      },
    },
    disabled: {
      description: 'Button Disabled',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isPending: {
      description: 'Button Pending',
      control: 'boolean',
      type: { name: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    iconKey: {
      ...iconKeyArgType,
      type: { required: false, name: 'string' },
      table: {
        subcategory: 'iconOption',
      },
    },
    iconPosition: {
      description: 'Button Icon Position',
      control: 'select',
      options: Object.values(BUTTON_ICON_POSITIONS),
      table: {
        defaultValue: { summary: BUTTON_ICON_POSITIONS.LEFT },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(BUTTON_ICON_POSITIONS),
          }),
        },
      },
    },
    onClick: {
      action: 'clicked',
      type: 'function',
      description: 'Button on click',
    },
    responsiveMobile: {
      name: 'mobile',
      description: 'Button responsive size for mobile',
      control: 'select',
      options: Object.values(BUTTON_SIZES),
      table: {
        subcategory: 'responsive',
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(BUTTON_SIZES),
          }),
        },
      },
    },
    responsiveTablet: {
      name: 'tablet',
      description: 'Button responsive size for tablet',
      control: 'select',
      options: Object.values(BUTTON_SIZES),
      table: {
        subcategory: 'responsive',
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(BUTTON_SIZES),
          }),
        },
      },
    },
    responsiveDesktop: {
      name: 'desktop',
      description: 'Button responsive size for desktop',
      control: 'select',
      options: Object.values(BUTTON_SIZES),
      table: {
        subcategory: 'responsive',
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(BUTTON_SIZES),
          }),
        },
      },
    },
    className: {
      description: 'Button className',
      control: 'text',
      type: 'string',
    },
    ref: {
      description: 'Button ref',
      table: {
        type: {
          summary: 'Ref<HTMLButtonElement>',
        },
      },
    },
  },
} satisfies Meta<ButtonArgs>;

export default meta;

type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {
  args: {
    label: 'Button',
    variant: BUTTON_VARIANTS.FILLED,
    size: BUTTON_SIZES.SM,
    theme: BUTTON_THEMES.PRIMARY,
    disabled: false,
    onClick: () => alert('clicked'),
  },
  render: ({
    iconKey,
    responsiveMobile,
    responsiveTablet,
    responsiveDesktop,
    ...args
  }) => {
    return (
      <Button
        {...args}
        iconOption={{ iconKey }}
        responsive={getResponsive({
          responsiveMobile,
          responsiveTablet,
          responsiveDesktop,
        })}
      />
    );
  },
};

export const Variant: Story = {
  args: {
    label: 'Button',
    theme: BUTTON_THEMES.PRIMARY,
    variant: BUTTON_VARIANTS.FILLED,
    size: BUTTON_SIZES.SM,
    disabled: false,
    onClick: () => alert('clicked'),
  },
  render: ({
    iconKey,
    responsiveMobile,
    responsiveTablet,
    responsiveDesktop,
    ...args
  }) => {
    return (
      <ul className='flex flex-col gap-y-4'>
        {Object.entries(BUTTON_STYLES).map(([theme, variants]) => (
          <li key={theme}>
            <ul className='flex items-center justify-end'>
              {Object.keys(variants).map((variant) => (
                <li key={variant} className='flex w-24 justify-center'>
                  <Button
                    {...args}
                    theme={theme as ButtonTheme}
                    variant={variant as ButtonVariant}
                    iconOption={{ iconKey }}
                    responsive={getResponsive({
                      responsiveMobile,
                      responsiveTablet,
                      responsiveDesktop,
                    })}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  },
};

export const Size: Story = {
  args: {
    label: 'Button',
    theme: BUTTON_THEMES.PRIMARY,
    variant: BUTTON_VARIANTS.FILLED,
    disabled: false,
    onClick: () => alert('clicked'),
  },
  render: ({
    iconKey,
    responsiveMobile,
    responsiveTablet,
    responsiveDesktop,
    ...args
  }) => (
    <ul className='flex gap-x-4'>
      {Object.values(BUTTON_VARIANTS).map((variant) => (
        <li key={variant} className='flex w-32 justify-center gap-y-4'>
          <ul className='flex flex-col gap-4'>
            {Object.values(BUTTON_SIZES).map((size) =>
              variant === BUTTON_VARIANTS.FILLED &&
              size === BUTTON_SIZES.XS ? null : (
                <li key={size}>
                  <Button
                    {...args}
                    variant={variant}
                    size={size}
                    iconOption={{ iconKey }}
                    responsive={getResponsive({
                      responsiveMobile,
                      responsiveTablet,
                      responsiveDesktop,
                    })}
                  />
                </li>
              ),
            )}
          </ul>
        </li>
      ))}
    </ul>
  ),
};

export const Responsive: Story = {
  args: {
    label: 'Button',
    size: BUTTON_SIZES.SM,
    theme: BUTTON_THEMES.PRIMARY,
    variant: BUTTON_VARIANTS.FILLED,
    disabled: false,
    onClick: () => alert('clicked'),
  },
  render: ({
    iconKey,
    responsiveMobile = BUTTON_SIZES.SM,
    responsiveTablet = BUTTON_SIZES.MD,
    responsiveDesktop = BUTTON_SIZES.LG,
    ...args
  }) => (
    <Button
      {...args}
      iconOption={{ iconKey }}
      responsive={getResponsive({
        responsiveMobile,
        responsiveTablet,
        responsiveDesktop,
      })}
    />
  ),
};
