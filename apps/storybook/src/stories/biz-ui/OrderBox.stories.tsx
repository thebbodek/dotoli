import {
  Flex,
  ORDER_BOX_VARIANTS,
  OrderBox,
  OrderBoxItem,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const ORDER_BOX_WIDTH_STYLE = 'w-[338px]';

const ITEMS: OrderBoxItem[] = [
  { boxes: '4박스', itemName: '4찬식판 A형 (20개)' },
  { boxes: '2박스', itemName: '국그릇 (30개)' },
  { boxes: '1박스', itemName: '수저세트 (50개)' },
];

const WRAPPED_ITEMS: OrderBoxItem[] = [
  ...ITEMS,
  { boxes: '3박스', itemName: '앞접시 (40개)' },
];

const meta = {
  title: 'core/biz-ui/Order/OrderBox',
  component: OrderBox,
  argTypes: {
    items: {
      control: 'object',
      type: {
        name: 'array',
        required: true,
        value: { name: 'object', value: {} },
      },
      table: {
        type: { summary: 'OrderBoxItem[]' },
      },
    },
    variant: {
      control: 'inline-radio',
      options: Object.values(ORDER_BOX_VARIANTS),
      table: {
        defaultValue: { summary: ORDER_BOX_VARIANTS.DEFAULT },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(ORDER_BOX_VARIANTS),
          }),
        },
      },
    },
  },
  args: {
    items: ITEMS,
  },
} satisfies Meta<typeof OrderBox>;

export default meta;

type Story = StoryObj<typeof OrderBox>;

export const Default: Story = {
  render: (args) => <OrderBox {...args} className={ORDER_BOX_WIDTH_STYLE} />,
};

export const Variants: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: ({ items }) => (
    <Flex align={{ items: 'start' }} gap='24'>
      {Object.values(ORDER_BOX_VARIANTS).map((variant) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={variant}
        >
          <Typography color='gray-500' variant='label-bold'>
            variant = {variant}
          </Typography>
          <OrderBox
            className={ORDER_BOX_WIDTH_STYLE}
            items={items}
            variant={variant}
          />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Empty: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => <OrderBox className={ORDER_BOX_WIDTH_STYLE} items={[]} />,
};

export const Wrapped: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: ({ items }) => (
    <Flex align={{ items: 'start' }} gap='24'>
      <Flex align={{ items: 'start' }} direction='column' gap='12'>
        <Typography color='gray-500' variant='label-bold'>
          3개 — 한 줄
        </Typography>
        <OrderBox className={ORDER_BOX_WIDTH_STYLE} items={items} />
      </Flex>
      <Flex align={{ items: 'start' }} direction='column' gap='12'>
        <Typography color='gray-500' variant='label-bold'>
          4개 — 줄바꿈
        </Typography>
        <OrderBox className={ORDER_BOX_WIDTH_STYLE} items={WRAPPED_ITEMS} />
      </Flex>
    </Flex>
  ),
};
