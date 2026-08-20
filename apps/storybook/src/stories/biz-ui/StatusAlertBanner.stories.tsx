import {
  Flex,
  STATUS_ALERT_BANNER_THEMES,
  StatusAlertBanner,
  StatusAlertBannerProps,
  Typography,
} from '@bbodek/biz-ui';
import { Decorator, Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const MESSAGE = '0월 00일(ㅇ)에 주문이 중지 돼요';

const LONG_MESSAGE = '문구가 길어지면 배너가 화면 폭에서 멈추고 말줄임됩니다';

const SCREEN_WIDTH_STYLE = 'w-[380px] outline outline-gray-200';

const TAIL_CLEARANCE = 'pt-[10px]';

const withTailClearance: Decorator = (Story) => (
  <div className={TAIL_CLEARANCE}>
    <Story />
  </div>
);

const meta = {
  title: 'core/biz-ui/StatusAlertBanner',
  component: StatusAlertBanner,
  decorators: [withTailClearance],
  argTypes: {
    message: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    theme: {
      control: 'inline-radio',
      options: Object.values(STATUS_ALERT_BANNER_THEMES),
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(STATUS_ALERT_BANNER_THEMES),
          }),
        },
        defaultValue: { summary: STATUS_ALERT_BANNER_THEMES.PRIMARY },
      },
    },
    role: { control: 'text' },
    'aria-live': { control: 'text' },
    onAction: { action: 'action' },
    onDismiss: { action: 'dismiss' },
  },
  args: {
    message: MESSAGE,
    theme: STATUS_ALERT_BANNER_THEMES.PRIMARY,
  },
} satisfies Meta<StatusAlertBannerProps>;

export default meta;

type Story = StoryObj<StatusAlertBannerProps>;

export const Default: Story = {};

export const Themes: Story = {
  parameters: { controls: { disable: true } },
  render: ({ message, onAction, onDismiss }) => (
    <Flex align={{ items: 'start' }} direction='column' gap='20'>
      {Object.values(STATUS_ALERT_BANNER_THEMES).map((theme) => (
        <StatusAlertBanner
          key={theme}
          message={message}
          theme={theme}
          onAction={onAction}
          onDismiss={onDismiss}
        />
      ))}
    </Flex>
  ),
};

export const Combinations: Story = {
  parameters: { controls: { disable: true } },
  render: ({ message, theme, onAction, onDismiss }) => (
    <Flex align={{ items: 'start' }} direction='column' gap='20'>
      <Flex align={{ items: 'start' }} direction='column' gap='8'>
        <Typography color='gray-500' variant='label-bold'>
          onAction · onDismiss
        </Typography>
        <StatusAlertBanner
          message={message}
          theme={theme}
          onAction={onAction}
          onDismiss={onDismiss}
        />
      </Flex>
      <Flex align={{ items: 'start' }} direction='column' gap='8'>
        <Typography color='gray-500' variant='label-bold'>
          onDismiss
        </Typography>
        <StatusAlertBanner
          message={message}
          theme={theme}
          onDismiss={onDismiss}
        />
      </Flex>
      <Flex align={{ items: 'start' }} direction='column' gap='8'>
        <Typography color='gray-500' variant='label-bold'>
          없음
        </Typography>
        <StatusAlertBanner message={message} theme={theme} />
      </Flex>
    </Flex>
  ),
};

export const LongMessage: Story = {
  parameters: { controls: { disable: true } },
  render: ({ theme, onAction, onDismiss }) => (
    <div className={SCREEN_WIDTH_STYLE}>
      <StatusAlertBanner
        message={LONG_MESSAGE}
        theme={theme}
        onAction={onAction}
        onDismiss={onDismiss}
      />
    </div>
  ),
};
