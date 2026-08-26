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

const VAT_EXCLUDED_DESCRIPTION = '부가세 미포함된 단가 기준입니다';

const VAT_INCLUDED_DESCRIPTION = '부가세가 포함된 금액입니다';

const WITH_TITLE_TITLE = '첫 로그인 전인가요?';

const WITH_TITLE_DESCRIPTION =
  '연락처 인증 전에는 계정을 찾을 수 없어요\n뽀득 또는 관리자에게 문의해 주세요';

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
    description: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    title: { control: 'text' },
    isSticky: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    onClick: { action: 'click' },
  },
  args: {
    description: VAT_EXCLUDED_DESCRIPTION,
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
  render: ({ description }) => (
    <div className={INLINE_MARGIN}>
      <Flex direction='column' gap='10'>
        {Object.values(INFO_BANNER_THEMES).map((theme) => (
          <InfoBanner description={description} key={theme} theme={theme} />
        ))}
      </Flex>
    </div>
  ),
};

export const Action: Story = {
  parameters: { controls: { disable: true } },
  render: ({ description, theme, onClick }) => (
    <div className={INLINE_MARGIN}>
      <Flex direction='column' gap='10'>
        <InfoBanner description={description} theme={theme} />
        <InfoBanner description={description} theme={theme} onClick={onClick} />
      </Flex>
    </div>
  ),
};

export const Sticky: Story = {
  parameters: { controls: { disable: true } },
  render: ({ description, theme }) => (
    <div className='h-[220px] overflow-y-auto bg-white'>
      <InfoBanner
        className='sticky top-0'
        description={description}
        theme={theme}
        isSticky
      />
      <div className='h-[600px] bg-gray-50' />
    </div>
  ),
};

// LGN-201 재현 — 굵은 첫 줄 + \n으로 끊은 본문 2줄
export const WithTitle: Story = {
  parameters: { controls: { disable: true } },
  render: ({ theme, onClick }) => (
    <div className={INLINE_MARGIN}>
      <Flex direction='column' gap='10'>
        <InfoBanner
          description={WITH_TITLE_DESCRIPTION}
          theme={theme}
          title={WITH_TITLE_TITLE}
        />
        <InfoBanner
          description={WITH_TITLE_DESCRIPTION}
          theme={theme}
          title={WITH_TITLE_TITLE}
          onClick={onClick}
        />
      </Flex>
    </div>
  ),
};

export const LongText: Story = {
  parameters: { controls: { disable: true } },
  render: ({ theme, onClick }) => (
    <div className={INLINE_MARGIN}>
      <Flex direction='column' gap='10'>
        <InfoBanner
          description={`${VAT_INCLUDED_DESCRIPTION}. ${VAT_EXCLUDED_DESCRIPTION}. 안내 문구가 한 줄을 넘어가면 잘리지 않고 줄바꿈됩니다`}
          theme={theme}
        />
        <InfoBanner
          description={`${VAT_INCLUDED_DESCRIPTION}. ${VAT_EXCLUDED_DESCRIPTION}. 안내 문구가 한 줄을 넘어가면 잘리지 않고 줄바꿈됩니다`}
          theme={theme}
          onClick={onClick}
        />
      </Flex>
    </div>
  ),
};
