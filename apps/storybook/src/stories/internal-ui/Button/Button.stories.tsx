import {
  Button,
  BUTTON_ICON_POSITIONS,
  BUTTON_SIZES,
  BUTTON_STYLES,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
  ButtonProps,
  ButtonTheme,
  ButtonVariant,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';

import { default as IconMeta } from '@/stories/internal-ui/Icon.stories';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const { iconKey: iconKeyArgType } = IconMeta.argTypes ?? {};

const BUTTON_TYPES = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  RESET: 'reset',
} as const;

export interface ButtonArgs extends Omit<ButtonProps, 'iconOption'> {
  iconKey: NonNullable<ButtonProps['iconOption']>['iconKey'];
}

const meta: Meta<ButtonArgs> = {
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
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    iconKey: {
      ...iconKeyArgType,
      type: { required: false, name: 'string' },
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
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {
  args: {
    label: 'Button',
    variant: BUTTON_VARIANTS.FILLED,
    size: BUTTON_SIZES.LG,
    theme: BUTTON_THEMES.PRIMARY,
    disabled: false,
    onClick: () => alert('clicked'),
  },
  render: ({ iconKey, ...args }) => (
    <Button {...args} iconOption={{ iconKey }} />
  ),
};

export const Variant: Story = {
  args: {
    label: 'Button',
    theme: BUTTON_THEMES.PRIMARY,
    variant: BUTTON_VARIANTS.FILLED,
    disabled: false,
    onClick: () => alert('clicked'),
  },
  render: ({ iconKey, ...args }) => (
    <ul className='flex flex-col gap-y-4'>
      {Object.entries(BUTTON_STYLES).map(([theme, variants]) => (
        <li key={theme}>
          <ul className='flex items-center justify-end gap-x-4'>
            {Object.keys(variants).map((variant) => (
              <li key={variant} className='flex w-32 justify-center'>
                <Button
                  {...args}
                  theme={theme as ButtonTheme}
                  variant={variant as ButtonVariant}
                  iconOption={{ iconKey }}
                />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  ),
};

export const Size: Story = {
  args: {
    label: 'Button',
    theme: BUTTON_THEMES.PRIMARY,
    variant: BUTTON_VARIANTS.FILLED,
    disabled: false,
    onClick: () => alert('clicked'),
  },
  render: ({ iconKey, ...args }) => (
    <ul className='flex gap-x-4'>
      {Object.values(BUTTON_VARIANTS).map((variant) => (
        <li key={variant} className='flex w-32 justify-center gap-y-4'>
          <ul className='flex flex-col gap-2'>
            {Object.values(BUTTON_SIZES).map((size) =>
              variant === BUTTON_VARIANTS.FILLED &&
              size === BUTTON_SIZES.XS ? null : (
                <li key={size}>
                  <Button
                    {...args}
                    variant={variant}
                    size={size}
                    iconOption={{ iconKey }}
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
