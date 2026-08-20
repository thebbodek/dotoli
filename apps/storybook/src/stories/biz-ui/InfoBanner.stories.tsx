import {
  Flex,
  INFO_BANNER_THEMES,
  InfoBanner,
  InfoBannerProps,
} from '@bbodek/biz-ui';
import { Decorator, Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const SCREEN_WIDTH = 'w-[380px]';

const INLINE_MARGIN = 'px-[20px]';

const VAT_EXCLUDED_LABEL = '부가세 미포함된 단가 기준입니다';

const VAT_INCLUDED_LABEL = '부가세가 포함된 금액입니다';

const withScreenWidth: Decorator = (Story) => (
  <div className={SCREEN_WIDTH}>
    <Story />
  </div>
);

const meta = {
  title: 'core/biz-ui/Info/InfoBanner',
  component: InfoBanner,
  decorators: [withScreenWidth],
  argTypes: {
    theme: {
      control: 'inline-radio',
      options: Object.values(INFO_BANNER_THEMES),
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(INFO_BANNER_THEMES),
          }),
        },
        defaultValue: { summary: INFO_BANNER_THEMES.PRIMARY },
      },
    },
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    isSticky: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    onClick: { action: 'click' },
  },
  args: {
    label: VAT_EXCLUDED_LABEL,
    theme: INFO_BANNER_THEMES.PRIMARY,
    isSticky: false,
  },
} satisfies Meta<InfoBannerProps>;

export default meta;

type Story = StoryObj<InfoBannerProps>;

export const Default: Story = {
  args: { onClick: undefined },
  render: (args) => (
    <div className={INLINE_MARGIN}>
      <InfoBanner {...args} />
    </div>
  ),
};

export const Themes: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label }) => (
    <div className={INLINE_MARGIN}>
      <Flex direction='column' gap='10'>
        {Object.values(INFO_BANNER_THEMES).map((theme) => (
          <InfoBanner key={theme} label={label} theme={theme} />
        ))}
      </Flex>
    </div>
  ),
};

export const Action: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label, theme, onClick }) => (
    <div className={INLINE_MARGIN}>
      <Flex direction='column' gap='10'>
        <InfoBanner label={label} theme={theme} />
        <InfoBanner label={label} theme={theme} onClick={onClick} />
      </Flex>
    </div>
  ),
};

export const Sticky: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label, theme }) => (
    <div className='h-[220px] overflow-y-auto bg-white'>
      <InfoBanner
        className='sticky top-0'
        label={label}
        theme={theme}
        isSticky
      />
      <div className='h-[600px] bg-gray-50' />
    </div>
  ),
};

export const LongText: Story = {
  parameters: { controls: { disable: true } },
  render: ({ theme, onClick }) => (
    <div className={INLINE_MARGIN}>
      <Flex direction='column' gap='10'>
        <InfoBanner
          label={`${VAT_INCLUDED_LABEL}. ${VAT_EXCLUDED_LABEL}. 안내 문구가 한 줄을 넘어가면 잘리지 않고 줄바꿈됩니다`}
          theme={theme}
        />
        <InfoBanner
          label={`${VAT_INCLUDED_LABEL}. ${VAT_EXCLUDED_LABEL}. 안내 문구가 한 줄을 넘어가면 잘리지 않고 줄바꿈됩니다`}
          theme={theme}
          onClick={onClick}
        />
      </Flex>
    </div>
  ),
};
