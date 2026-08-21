import {
  BOTTOM_ACTION_BAR_VARIANTS,
  BottomActionBar,
  BottomActionBarProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const CONFIRM_LABEL = '확인';

const CANCEL_LABEL = '취소';

const INFO = '{조건}, {선택값}\n텍스트 영역';

const SCREEN_WIDTH_STYLE = 'w-[380px] outline outline-gray-200';

const GROUP_STYLE = 'flex-v-stack w-[380px] gap-[8px]';

const LIST_STYLE = 'flex-v-stack gap-[20px]';

const SCROLL_PAGE_STYLE =
  'scroll-y flex-v-stack h-[420px] w-[380px] outline outline-gray-200';

const SCROLL_BODY_STYLE = 'flex-v-stack shrink-0 gap-[8px] p-[20px]';

const SCROLL_BLOCK_STYLE = 'h-[80px] shrink-0 rounded-8 bg-gray-100';

const SCROLL_BLOCK_COUNT = 8;

const meta = {
  title: 'core/biz-ui/BottomActionBar',
  component: BottomActionBar,
  argTypes: {
    info: { control: 'text' },
    variant: {
      control: 'inline-radio',
      options: Object.values(BOTTOM_ACTION_BAR_VARIANTS),
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(BOTTOM_ACTION_BAR_VARIANTS),
          }),
        },
        defaultValue: { summary: BOTTOM_ACTION_BAR_VARIANTS.FLOATING },
      },
    },
  },
  args: {
    confirm: { label: CONFIRM_LABEL, onClick: () => {} },
    variant: BOTTOM_ACTION_BAR_VARIANTS.FLOATING,
  },
} satisfies Meta<BottomActionBarProps>;

export default meta;

type Story = StoryObj<BottomActionBarProps>;

export const Default: Story = {
  render: (args) => (
    <div className={SCREEN_WIDTH_STYLE}>
      <BottomActionBar {...args} />
    </div>
  ),
};

export const Actions: Story = {
  parameters: { controls: { disable: true } },
  render: ({ confirm, variant }) => (
    <div className={LIST_STYLE}>
      <div className={GROUP_STYLE}>
        <Typography color='gray-500' variant='label-bold'>
          single
        </Typography>
        <div className={SCREEN_WIDTH_STYLE}>
          <BottomActionBar confirm={confirm} variant={variant} />
        </div>
      </div>
      <div className={GROUP_STYLE}>
        <Typography color='gray-500' variant='label-bold'>
          two
        </Typography>
        <div className={SCREEN_WIDTH_STYLE}>
          <BottomActionBar
            cancel={{ label: CANCEL_LABEL, onClick: () => {} }}
            confirm={confirm}
            variant={variant}
          />
        </div>
      </div>
      <div className={GROUP_STYLE}>
        <Typography color='gray-500' variant='label-bold'>
          withInfo
        </Typography>
        <div className={SCREEN_WIDTH_STYLE}>
          <BottomActionBar confirm={confirm} info={INFO} variant={variant} />
        </div>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: ({ confirm }) => (
    <div className={LIST_STYLE}>
      {Object.values(BOTTOM_ACTION_BAR_VARIANTS).map((variant) => (
        <div className={GROUP_STYLE} key={variant}>
          <Typography color='gray-500' variant='label-bold'>
            {variant}
          </Typography>
          <div className={SCREEN_WIDTH_STYLE}>
            <BottomActionBar
              cancel={{ label: CANCEL_LABEL, onClick: () => {} }}
              confirm={confirm}
              variant={variant}
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

// 그라디언트와 sticky는 스크롤되는 콘텐츠 위에서만 드러난다
export const Sticky: Story = {
  parameters: { controls: { disable: true } },
  render: ({ confirm }) => (
    <div className={LIST_STYLE}>
      {Object.values(BOTTOM_ACTION_BAR_VARIANTS).map((variant) => (
        <div className={GROUP_STYLE} key={variant}>
          <Typography color='gray-500' variant='label-bold'>
            {variant}
          </Typography>
          <div className={SCROLL_PAGE_STYLE}>
            <div className={SCROLL_BODY_STYLE}>
              {Array.from({ length: SCROLL_BLOCK_COUNT }, (_, index) => (
                <div className={SCROLL_BLOCK_STYLE} key={index} />
              ))}
            </div>
            <BottomActionBar confirm={confirm} variant={variant} />
          </div>
        </div>
      ))}
    </div>
  ),
};
