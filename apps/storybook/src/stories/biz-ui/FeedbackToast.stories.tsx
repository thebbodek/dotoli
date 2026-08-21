import {
  FEEDBACK_TOAST_TYPES,
  FeedbackToast,
  FeedbackToastProps,
  FeedbackToastType,
  Flex,
  Typography,
} from '@bbodek/biz-ui';
import { Decorator, Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const MESSAGE = '6월 5주 - 7월 1주 주문 완료';

const TYPE_MESSAGES: Record<FeedbackToastType, string> = {
  [FEEDBACK_TOAST_TYPES.SUCCESS]: MESSAGE,
  [FEEDBACK_TOAST_TYPES.INFO]: '{필수값}을 입력해주세요',
  [FEEDBACK_TOAST_TYPES.WARNING]: '경고메세지 들어갑니다',
  [FEEDBACK_TOAST_TYPES.ERROR]: '안됨',
};

const LONG_MESSAGE = '상호명, 사업자등록번호, 담당자 연락처를 입력해주세요';

const SCREEN_WIDTH_STYLE = 'w-[380px]';

const withScreenWidth: Decorator = (Story) => (
  <div className={SCREEN_WIDTH_STYLE}>
    <Story />
  </div>
);

const meta = {
  title: 'core/biz-ui/FeedbackToast',
  component: FeedbackToast,
  decorators: [withScreenWidth],
  argTypes: {
    message: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    type: {
      control: 'inline-radio',
      options: Object.values(FEEDBACK_TOAST_TYPES),
      table: {
        defaultValue: { summary: FEEDBACK_TOAST_TYPES.SUCCESS },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(FEEDBACK_TOAST_TYPES),
          }),
        },
      },
    },
    role: { control: 'text' },
    'aria-live': { control: 'text' },
  },
  args: {
    message: MESSAGE,
    type: FEEDBACK_TOAST_TYPES.SUCCESS,
  },
} satisfies Meta<FeedbackToastProps>;

export default meta;

type Story = StoryObj<FeedbackToastProps>;

export const Default: Story = {};

// Figma 문서 프레임과 같은 배치 — 문구도 심볼에 적힌 것을 그대로 쓴다
export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Flex align={{ items: 'start' }} direction='column' gap='12'>
      {Object.values(FEEDBACK_TOAST_TYPES).map((type) => (
        <FeedbackToast key={type} message={TYPE_MESSAGES[type]} type={type} />
      ))}
    </Flex>
  ),
};

export const LongMessage: Story = {
  parameters: { controls: { disable: true } },
  render: ({ type }) => (
    <Flex align={{ items: 'start' }} direction='column' gap='8'>
      <Typography color='gray-500' variant='label-bold'>
        필수값 전체 나열 — 한 줄을 넘기면 접힌다
      </Typography>
      <FeedbackToast message={LONG_MESSAGE} type={type} />
    </Flex>
  ),
};
