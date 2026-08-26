import {
  Flex,
  ICON_CIRCLE_THEMES,
  Toast,
  TOAST_ICON_THEMES,
  TOAST_STATUSES,
  ToastAction,
  ToastProps,
  Typography,
} from '@bbodek/biz-ui';
import { Decorator, Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { default as IconMeta } from '@/stories/biz-ui/Icon.stories';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const omitDescription = <T,>(argType: T): Omit<T, 'description'> => {
  const next = { ...argType };
  delete (next as { description?: unknown }).description;

  return next;
};

const { iconKey: iconKeyArgTypeSource, weight: weightArgTypeSource } =
  IconMeta.argTypes ?? {};

const iconKeyArgType = omitDescription(iconKeyArgTypeSource ?? {});

const weightArgType = omitDescription(weightArgTypeSource ?? {});

const MESSAGE = '주문이 등록되었어요';

const LOADING_MESSAGE = '잠시만 기다려주세요';

const LONG_MESSAGE =
  '필수 입력값이 비어 있어 주문을 등록하지 못했어요. 확인 후 다시 시도해주세요';

const MULTILINE_MESSAGE = '주문이 등록되었어요\n배송일에 맞춰 준비할게요';

const LEADING_HIGHLIGHT_MESSAGE = (
  <>
    <strong>6월 15일</strong> 주문이 등록되었어요
  </>
);

const INLINE_HIGHLIGHT_MESSAGE = (
  <>
    주문 <strong>3건</strong>이 등록되었어요
  </>
);

const THEME_DEFAULT_SUMMARY = Object.entries(TOAST_ICON_THEMES)
  .map(([status, theme]) => `${status} → ${theme}`)
  .join(' · ');

const ICON_KEY = 'arrows-clockwise';

const ACTION: ToastAction = { label: '보기', onClick: fn() };

const SCREEN_WIDTH_STYLE = 'w-[380px]';

const withScreenWidth: Decorator = (Story) => (
  <div className={SCREEN_WIDTH_STYLE}>
    <Story />
  </div>
);

const meta = {
  title: 'core/biz-ui/Toast',
  component: Toast,
  decorators: [withScreenWidth],
  argTypes: {
    message: {
      control: 'text',
      type: { name: 'other', value: 'ReactNode', required: true },
    },
    status: {
      control: 'inline-radio',
      options: Object.values(TOAST_STATUSES),
      table: {
        defaultValue: { summary: TOAST_STATUSES.INFO },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(TOAST_STATUSES),
          }),
        },
      },
    },
    iconKey: iconKeyArgType,
    weight: weightArgType,
    theme: {
      control: 'inline-radio',
      options: Object.values(ICON_CIRCLE_THEMES),
      table: {
        defaultValue: { summary: THEME_DEFAULT_SUMMARY },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(ICON_CIRCLE_THEMES),
          }),
        },
      },
    },
    action: { control: 'object' },
    role: { control: 'text' },
    'aria-live': { control: 'text' },
    onDismiss: { action: 'dismiss' },
  },
  args: {
    message: MESSAGE,
    status: TOAST_STATUSES.INFO,
    iconKey: ICON_KEY,
  },
} satisfies Meta<ToastProps>;

export default meta;

type Story = StoryObj<ToastProps>;

export const Default: Story = {};

// Figma 컴포넌트 세트와 같은 배치 — useDismiss × useAction 4조합
export const Combinations: Story = {
  parameters: { controls: { disable: true } },
  render: ({ message, iconKey, onDismiss }) => (
    <Flex direction='column' gap='20'>
      <Flex align={{ items: 'start' }} direction='column' gap='8'>
        <Typography color='gray-500' variant='label-bold'>
          onDismiss
        </Typography>
        <Toast iconKey={iconKey} message={message} onDismiss={onDismiss} />
      </Flex>
      <Flex align={{ items: 'start' }} direction='column' gap='8'>
        <Typography color='gray-500' variant='label-bold'>
          action · onDismiss
        </Typography>
        <Toast
          action={ACTION}
          iconKey={iconKey}
          message={message}
          onDismiss={onDismiss}
        />
      </Flex>
      <Flex align={{ items: 'start' }} direction='column' gap='8'>
        <Typography color='gray-500' variant='label-bold'>
          action
        </Typography>
        <Toast action={ACTION} iconKey={iconKey} message={message} />
      </Flex>
      <Flex align={{ items: 'start' }} direction='column' gap='8'>
        <Typography color='gray-500' variant='label-bold'>
          없음
        </Typography>
        <Toast iconKey={iconKey} message={message} />
      </Flex>
    </Flex>
  ),
};

// 아이콘은 status가 고정하고 360도 회전한다 (Figma 주석 355:1202)
export const Loading: Story = {
  parameters: { controls: { disable: true } },
  args: {
    message: LOADING_MESSAGE,
    status: TOAST_STATUSES.LOADING,
  },
};

export const LongMessage: Story = {
  parameters: { controls: { disable: true } },
  render: ({ iconKey, onDismiss }) => (
    <Toast iconKey={iconKey} message={LONG_MESSAGE} onDismiss={onDismiss} />
  ),
};

// \n으로 끊는 자리 — 자동 접힘(LongMessage)과 달리 소비자가 위치를 정한다
export const MultilineMessage: Story = {
  parameters: { controls: { disable: true } },
  render: ({ iconKey }) => (
    <Toast iconKey={iconKey} message={MULTILINE_MESSAGE} />
  ),
};

// 아이콘 색과 강조색이 theme 하나로 함께 바뀐다 — 강조는 300대, gray만 굵기로 구분
export const Themes: Story = {
  parameters: { controls: { disable: true } },
  render: ({ iconKey }) => (
    <Flex direction='column' gap='12'>
      {Object.values(ICON_CIRCLE_THEMES).map((theme) => (
        <Flex align={{ items: 'start' }} direction='column' gap='8' key={theme}>
          <Typography color='gray-500' variant='label-bold'>
            {theme}
          </Typography>
          <Toast
            iconKey={iconKey}
            message={LEADING_HIGHLIGHT_MESSAGE}
            theme={theme}
          />
        </Flex>
      ))}
    </Flex>
  ),
};

// 강조부는 소비자가 <strong>으로 위치를 정하고 색·굵기는 theme이 정한다
export const Highlight: Story = {
  parameters: { controls: { disable: true } },
  render: ({ message, iconKey }) => (
    <Flex direction='column' gap='12'>
      <Flex align={{ items: 'start' }} direction='column' gap='8'>
        <Typography color='gray-500' variant='label-bold'>
          없음
        </Typography>
        <Toast iconKey={iconKey} message={message} />
      </Flex>
      <Flex align={{ items: 'start' }} direction='column' gap='8'>
        <Typography color='gray-500' variant='label-bold'>
          앞쪽
        </Typography>
        <Toast iconKey={iconKey} message={LEADING_HIGHLIGHT_MESSAGE} />
      </Flex>
      <Flex align={{ items: 'start' }} direction='column' gap='8'>
        <Typography color='gray-500' variant='label-bold'>
          문장 중간
        </Typography>
        <Toast iconKey={iconKey} message={INLINE_HIGHLIGHT_MESSAGE} />
      </Flex>
    </Flex>
  ),
};
