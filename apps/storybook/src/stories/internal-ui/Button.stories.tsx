import {
  Button,
  BUTTON_SIZES,
  BUTTON_STYLES,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
  ButtonTheme,
  ButtonVariant,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';

import { default as IconMeta } from './Icon.stories';

const { iconKey: iconKeyArgType } = IconMeta.argTypes ?? {};

const meta: Meta<typeof Button> = {
  title: 'core/internal-ui/Button/Button',
  component: Button,
  argTypes: {
    variant: {
      description: 'Button Variant',
      options: Object.values(BUTTON_VARIANTS),
      control: 'select',
      table: {
        type: {
          summary: `'${Object.values(BUTTON_VARIANTS).join(`' | '`)}'`,
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
          summary: `'${Object.values(BUTTON_THEMES).join(`' | '`)}'`,
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
          summary: `'${Object.values(BUTTON_SIZES).join(`' | '`)}'`,
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
    leftIconKey: iconKeyArgType,
    rightIconKey: iconKeyArgType,
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Button',
    variant: BUTTON_VARIANTS.FILLED,
    size: BUTTON_SIZES.LG,
    theme: BUTTON_THEMES.PRIMARY,
    disabled: false,
    onClick: () => alert('clicked'),
  },
};

export const Variant: Story = {
  args: {
    label: 'Button',
    theme: BUTTON_THEMES.PRIMARY,
    variant: BUTTON_VARIANTS.FILLED,
    disabled: false,
    onClick: () => alert('clicked'),
  },
  render: (args) => (
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
  render: (args) => (
    <ul className='flex gap-x-4'>
      {Object.values(BUTTON_VARIANTS).map((variant) => (
        <li key={variant} className='flex w-32 justify-center gap-y-4'>
          <ul className='flex flex-col gap-2'>
            {Object.values(BUTTON_SIZES).map((size) =>
              variant === BUTTON_VARIANTS.FILLED &&
              size === BUTTON_SIZES.XS ? null : (
                <li key={size}>
                  <Button {...args} variant={variant} size={size} />
                </li>
              ),
            )}
          </ul>
        </li>
      ))}
    </ul>
  ),
};
