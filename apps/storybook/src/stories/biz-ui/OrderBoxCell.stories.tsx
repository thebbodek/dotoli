import {
  Flex,
  ORDER_BOX_CELL_TONES,
  OrderBoxCell,
  OrderBoxCellTone,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

// inverse는 흰 텍스트라 밝은 배경에서 안 보인다. 어두운 판 위에 깐다
const INVERSE_TONE_BACKDROP = 'bg-gray-900 rounded-6 p-3';

const getBackdrop = (tone: OrderBoxCellTone) =>
  tone === ORDER_BOX_CELL_TONES.INVERSE ? INVERSE_TONE_BACKDROP : undefined;

const meta = {
  title: 'core/biz-ui/Order/OrderBoxCell',
  component: OrderBoxCell,
  argTypes: {
    boxes: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    itemName: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    tone: {
      control: 'inline-radio',
      options: Object.values(ORDER_BOX_CELL_TONES),
      table: {
        defaultValue: { summary: ORDER_BOX_CELL_TONES.DEFAULT },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(ORDER_BOX_CELL_TONES),
          }),
        },
      },
    },
  },
  args: {
    boxes: '4박스',
    itemName: '4찬식판 A형 (20개)',
  },
} satisfies Meta<typeof OrderBoxCell>;

export default meta;

type Story = StoryObj<typeof OrderBoxCell>;

export const Default: Story = {
  render: ({ tone = ORDER_BOX_CELL_TONES.DEFAULT, ...args }) => (
    <Flex className={getBackdrop(tone)}>
      <OrderBoxCell {...args} tone={tone} />
    </Flex>
  ),
};

export const Tones: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: ({ boxes, itemName }) => (
    <Flex align={{ items: 'start' }} gap='24'>
      {Object.values(ORDER_BOX_CELL_TONES).map((tone) => (
        <Flex align={{ items: 'start' }} direction='column' gap='12' key={tone}>
          <Typography color='gray-500' variant='label-bold'>
            tone = {tone}
          </Typography>
          <Flex className={getBackdrop(tone)}>
            <OrderBoxCell boxes={boxes} itemName={itemName} tone={tone} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};
