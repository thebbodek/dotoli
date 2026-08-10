import {
  BUTTON_ICON_POSITIONS,
  CTA_BUTTON_SIZES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
  CtaButton,
  CtaButtonProps,
  CtaButtonTheme,
  Flex,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { default as IconMeta } from '@/stories/biz-ui/Icon.stories';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const { iconKey: iconKeyArgType } = IconMeta.argTypes ?? {};

// 점 표기 argType('iconOption.iconKey')은 타입이 깨져서 iconKey를 최상위로 편다
export interface CtaButtonArgs extends Omit<CtaButtonProps, 'iconOption'> {
  iconKey: NonNullable<CtaButtonProps['iconOption']>['iconKey'];
}

const meta = {
  title: 'core/biz-ui/Button/CtaButton',
  component: CtaButton,
  argTypes: {
    label: {
      control: 'text',
      type: {
        name: 'string',
        required: true,
      },
    },
    variant: {
      control: 'select',
      options: Object.values(CTA_BUTTON_VARIANTS),
      table: {
        defaultValue: { summary: CTA_BUTTON_VARIANTS.FILLED },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(CTA_BUTTON_VARIANTS),
          }),
        },
      },
    },
    theme: {
      control: 'select',
      options: Object.values(CTA_BUTTON_THEMES),
      table: {
        defaultValue: { summary: CTA_BUTTON_THEMES.PRIMARY },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(CTA_BUTTON_THEMES),
          }),
        },
      },
    },
    size: {
      control: 'select',
      options: Object.values(CTA_BUTTON_SIZES),
      table: {
        defaultValue: { summary: CTA_BUTTON_SIZES.LG },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(CTA_BUTTON_SIZES),
          }),
        },
      },
    },
    iconPosition: {
      control: 'inline-radio',
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
    iconKey: {
      ...iconKeyArgType,
      type: { name: 'string', required: false },
      table: { subcategory: 'iconOption' },
    },
    isPending: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    label: '수정 완료',
  },
} satisfies Meta<CtaButtonArgs>;

export default meta;

type Story = StoryObj<CtaButtonArgs>;

export const Default: Story = {
  render: ({ iconKey, ...args }) => (
    <CtaButton {...args} iconOption={{ iconKey }} />
  ),
};

export const Themes: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label }) => (
    <Flex direction='column' gap='24'>
      {Object.values(CTA_BUTTON_THEMES).map((theme) => (
        <Flex direction='column' gap='12' key={theme}>
          <Typography color='gray-500' variant='label-bold'>
            theme = {theme}
          </Typography>
          <Flex align={{ items: 'center' }} gap='8' wrap='wrap'>
            {Object.values(CTA_BUTTON_VARIANTS).map((variant) => (
              <CtaButton
                key={variant}
                label={label}
                theme={theme}
                variant={variant}
              />
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label }) => (
    <Flex direction='column' gap='24'>
      {Object.values(CTA_BUTTON_VARIANTS).map((variant) => (
        <Flex direction='column' gap='12' key={variant}>
          <Typography color='gray-500' variant='label-bold'>
            variant = {variant}
          </Typography>
          <Flex align={{ items: 'center' }} gap='8'>
            {Object.values(CTA_BUTTON_SIZES).map((size) => (
              <CtaButton
                key={size}
                label={label}
                size={size}
                variant={variant}
              />
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label }) => (
    <Flex direction='column' gap='24'>
      {Object.values(BUTTON_ICON_POSITIONS).map((iconPosition) => (
        <Flex direction='column' gap='12' key={iconPosition}>
          <Typography color='gray-500' variant='label-bold'>
            iconPosition = {iconPosition}
          </Typography>
          {Object.values(CTA_BUTTON_VARIANTS).map((variant) => (
            <Flex align={{ items: 'center' }} gap='8' key={variant} wrap='wrap'>
              <Typography
                className='w-20 shrink-0'
                color='gray-500'
                variant='label'
              >
                {variant}
              </Typography>
              {Object.values(CTA_BUTTON_SIZES).map((size) => (
                <CtaButton
                  iconOption={{ iconKey: 'plus' }}
                  iconPosition={iconPosition}
                  key={size}
                  label={label}
                  size={size}
                  variant={variant}
                />
              ))}
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  ),
};

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label }) => (
    <Flex direction='column' gap='24'>
      {Object.values(CTA_BUTTON_THEMES).map((theme) => (
        <Flex direction='column' gap='12' key={theme}>
          <Typography color='gray-500' variant='label-bold'>
            theme = {theme}
          </Typography>
          <Flex align={{ items: 'center' }} gap='8' wrap='wrap'>
            {Object.values(CTA_BUTTON_VARIANTS).map((variant) => (
              <CtaButton
                key={variant}
                label={label}
                theme={theme}
                variant={variant}
                disabled
              />
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Pending: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label }) => (
    <Flex align={{ items: 'center' }} gap='8' wrap='wrap'>
      {Object.values(CTA_BUTTON_VARIANTS).map((variant) => (
        <CtaButton key={variant} label={label} variant={variant} isPending />
      ))}
    </Flex>
  ),
};

export const Matrix: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: ({ label }) => (
    <Flex direction='column' gap='32'>
      {Object.values(CTA_BUTTON_THEMES).map((theme: CtaButtonTheme) => (
        <Flex direction='column' gap='16' key={theme}>
          <Typography variant='heading-5'>theme = {theme}</Typography>
          {Object.values(CTA_BUTTON_VARIANTS).map((variant) => (
            <Flex align={{ items: 'center' }} gap='8' key={variant} wrap='wrap'>
              <Typography
                className='w-20 shrink-0'
                color='gray-500'
                variant='label'
              >
                {variant}
              </Typography>
              {Object.values(CTA_BUTTON_SIZES).map((size) => (
                <CtaButton
                  key={size}
                  label={label}
                  size={size}
                  theme={theme}
                  variant={variant}
                />
              ))}
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  ),
};
