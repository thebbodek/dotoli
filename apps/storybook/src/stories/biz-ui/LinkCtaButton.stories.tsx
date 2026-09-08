import {
  CTA_BUTTON_SIZES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
  Flex,
  LinkCtaButton,
  LinkCtaButtonProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { default as CtaButtonMeta } from '@/stories/biz-ui/CtaButton.stories';

const { label, variant, theme, size, iconPosition, iconKey } =
  CtaButtonMeta.argTypes ?? {};

// CtaButton과 같은 이유로 iconKey를 최상위로 편다
export interface LinkCtaButtonArgs
  extends Omit<LinkCtaButtonProps, 'iconOption'> {
  iconKey: NonNullable<LinkCtaButtonProps['iconOption']>['iconKey'];
}

const meta = {
  title: 'core/biz-ui/Button/LinkCtaButton',
  component: LinkCtaButton,
  argTypes: {
    href: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    label,
    variant,
    theme,
    size,
    iconPosition,
    iconKey,
    isDisabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    href: '/order',
    label: '주문하러 가기',
  },
} satisfies Meta<LinkCtaButtonArgs>;

export default meta;

type Story = StoryObj<LinkCtaButtonArgs>;

export const Default: Story = {
  render: ({ iconKey, ...args }) => (
    <LinkCtaButton {...args} iconOption={{ iconKey }} />
  ),
};

// 시각은 CtaButton과 같은 생성기에서 나온다. 여기서 보는 것은 <a>로 바뀌어도 동일한가
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: ({ href, label }) => (
    <Flex direction='column' gap='24'>
      {Object.values(CTA_BUTTON_THEMES).map((buttonTheme) => (
        <Flex direction='column' gap='12' key={buttonTheme}>
          <Typography color='gray-500' variant='label-bold'>
            theme = {buttonTheme}
          </Typography>
          <Flex align={{ items: 'center' }} gap='8' wrap='wrap'>
            {Object.values(CTA_BUTTON_VARIANTS).map((buttonVariant) => (
              <LinkCtaButton
                href={href}
                key={buttonVariant}
                label={label}
                theme={buttonTheme}
                variant={buttonVariant}
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
  render: ({ href, label }) => (
    <Flex align={{ items: 'center' }} gap='8'>
      {Object.values(CTA_BUTTON_SIZES).map((buttonSize) => (
        <LinkCtaButton
          href={href}
          key={buttonSize}
          label={label}
          size={buttonSize}
        />
      ))}
    </Flex>
  ),
};

// isDisabled는 aria-disabled + tabIndex=-1 + 클릭 차단이다. 눌러도 이동하지 않는 것을 확인한다
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: ({ href, label }) => (
    <Flex align={{ items: 'center' }} gap='8' wrap='wrap'>
      {Object.values(CTA_BUTTON_VARIANTS).map((buttonVariant) => (
        <LinkCtaButton
          href={href}
          key={buttonVariant}
          label={label}
          variant={buttonVariant}
          isDisabled
        />
      ))}
    </Flex>
  ),
};
