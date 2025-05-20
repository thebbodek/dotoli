import {
  Button,
  BUTTON_COLORS,
  BUTTON_ELEMENTS,
  BUTTON_SIZES,
  BUTTON_STYLES_MAPPER,
  BUTTON_VARIANTS,
  ButtonColors,
  ButtonVariants,
  Icon,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'core/internal-ui/Button/Button',
  component: Button,
  argTypes: {
    as: {
      description: 'Button Element',
      control: 'select',
      type: 'string',
      options: Object.values(BUTTON_ELEMENTS),
      table: {
        defaultValue: { summary: BUTTON_ELEMENTS.BUTTON },
      },
    },
    variant: {
      description: 'Button Variant',
      control: 'select',
      options: Object.values(BUTTON_VARIANTS),
      table: {
        defaultValue: { summary: BUTTON_VARIANTS.FILLED },
      },
    },
    color: {
      description: 'Button Color',
      control: 'select',
      options: Object.values(BUTTON_COLORS),
      table: {
        defaultValue: { summary: BUTTON_COLORS.PRIMARY },
      },
    },
    size: {
      description: 'Button Size',
      control: 'select',
      options: Object.values(BUTTON_SIZES),
      table: {
        defaultValue: { summary: BUTTON_SIZES.LARGE },
      },
    },
    disabled: {
      description: 'Button Disabled',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Button',
    as: BUTTON_ELEMENTS.BUTTON,
    variant: BUTTON_VARIANTS.FILLED,
    size: BUTTON_SIZES.LARGE,
    color: BUTTON_COLORS.PRIMARY,
    disabled: false,
    onClick: () => alert('clicked'),
  },
};

export const Link: Story = {
  args: {
    as: BUTTON_ELEMENTS.LINK,
    color: BUTTON_COLORS.PRIMARY,
    variant: BUTTON_VARIANTS.OUTLINED,
    href: 'https://www.bbodek.com',
    target: '_blank',
    label: '뽀득 바로가기',
    disabled: false,
    leftIcon: <Icon iconKey='arrow-square-out' />,
  },
};

export const Variant: Story = {
  args: {
    color: 'primary',
    variant: 'filled',
    label: 'Button',
    disabled: false,
    onClick: () => alert('clicked'),
  },
  render: (args) => {
    return (
      <ul className='flex flex-col gap-y-4'>
        {Object.entries(BUTTON_STYLES_MAPPER).map(([color, variants]) => (
          <li key={color}>
            <ul className='flex items-center justify-end gap-x-4'>
              {Object.keys(variants).map((variant) => (
                <li key={variant} className='flex w-32 justify-center'>
                  <Button
                    {...args}
                    color={color as ButtonColors}
                    variant={variant as ButtonVariants}
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
    color: 'primary',
    variant: 'tonal',
    label: 'Button',
    disabled: false,
    onClick: () => alert('clicked'),
  },
  render: (args) => {
    return (
      <ul className='flex gap-x-4'>
        {Object.values(BUTTON_VARIANTS).map((variant) => (
          <li key={variant} className='flex w-32 justify-center gap-y-4'>
            <ul className='flex flex-col gap-2'>
              {Object.values(BUTTON_SIZES).map((size) =>
                variant === BUTTON_VARIANTS.FILLED &&
                size === BUTTON_SIZES.X_SMALL ? null : (
                  <li key={size}>
                    <Button {...args} variant={variant} size={size} />
                  </li>
                ),
              )}
            </ul>
          </li>
        ))}
      </ul>
    );
  },
};
