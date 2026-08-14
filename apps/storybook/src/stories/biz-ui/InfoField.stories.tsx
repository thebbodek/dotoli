import {
  Flex,
  INFO_FIELD_LAYOUTS,
  InfoField,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

// horizontal은 justify-between이라 폭이 있어야 배치가 보인다. 문서 프레임 값을 쓴다
const DOCUMENT_FRAME_WIDTH = 'w-[304px]';

const meta = {
  title: 'core/biz-ui/Info/InfoField',
  component: InfoField,
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    value: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    layout: {
      control: 'inline-radio',
      options: Object.values(INFO_FIELD_LAYOUTS),
      table: {
        defaultValue: { summary: INFO_FIELD_LAYOUTS.HORIZONTAL },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(INFO_FIELD_LAYOUTS),
          }),
        },
      },
    },
  },
  args: {
    label: '주문번호',
    value: '20260814-0001',
  },
  decorators: [
    (Story) => (
      <div className={DOCUMENT_FRAME_WIDTH}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InfoField>;

export default meta;

type Story = StoryObj<typeof InfoField>;

export const Default: Story = {};

export const Layouts: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: ({ label, value }) => (
    <Flex direction='column' gap='24'>
      {Object.values(INFO_FIELD_LAYOUTS).map((layout) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='8'
          key={layout}
        >
          <Typography color='gray-500' variant='caption'>
            {layout}
          </Typography>
          <InfoField label={label} layout={layout} value={value} />
        </Flex>
      ))}
    </Flex>
  ),
};

// 폭을 넘겨도 컨테이너를 벗어나지 않는다. 높이가 고정이 아니라 행이 늘어날 뿐이다
export const LongText: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Flex direction='column' gap='24'>
      {Object.values(INFO_FIELD_LAYOUTS).map((layout) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='8'
          key={layout}
        >
          <Typography color='gray-500' variant='caption'>
            {layout}
          </Typography>
          <InfoField
            label='아주 긴 라벨이 들어가는 경우'
            layout={layout}
            value='아주 긴 값이 들어가서 한 줄을 넘기는 경우'
          />
        </Flex>
      ))}
    </Flex>
  ),
};
