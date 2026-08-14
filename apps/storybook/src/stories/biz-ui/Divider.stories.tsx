import { Divider, DIVIDER_TYPES, Flex, Typography } from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

// 실제 폭은 fill이라 문서 프레임과 같은 340px을 스토리에서만 건다
const DOCUMENT_FRAME_WIDTH = 'w-[340px]';

// argTypes의 `if`가 조건이 어긋나면 arg를 통째로 지운다. type을 전부 도는 Types는 arg를 못 쓴다
const SAMPLE_LABEL = '텍스트가 들어갑니다';

const meta = {
  title: 'core/biz-ui/Divider',
  component: Divider,
  argTypes: {
    type: {
      control: 'inline-radio',
      options: Object.values(DIVIDER_TYPES),
      table: {
        defaultValue: { summary: DIVIDER_TYPES.UP },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(DIVIDER_TYPES),
          }),
        },
      },
    },
    label: {
      control: 'text',
      if: { arg: 'type', eq: DIVIDER_TYPES.TEXT },
    },
  },
  args: {
    label: SAMPLE_LABEL,
  },
  decorators: [
    (Story) => (
      <div className={DOCUMENT_FRAME_WIDTH}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {};

// Figma 문서 프레임과 같은 순서. line만 선 색이 gray-100이라 나란히 놓고 본다
export const Types: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Flex direction='column' gap='24'>
      {Object.values(DIVIDER_TYPES).map((type) => (
        <Flex align={{ items: 'start' }} direction='column' gap='8' key={type}>
          <Typography color='gray-500' variant='caption'>
            {type}
          </Typography>
          <Divider label={SAMPLE_LABEL} type={type} />
        </Flex>
      ))}
    </Flex>
  ),
};
