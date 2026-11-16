import {
  Flex,
  ORDER_BOX_EMPTY_LABEL,
  OrderBox,
  OrderBoxItem,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

const ORDER_BOX_WIDTH_STYLE = 'w-[306px]';

const EMPTY_LABEL = '휴무일';

const ITEMS: OrderBoxItem[] = [
  { itemName: '식판', quantity: '5박스 · 125개' },
  { itemName: '국그릇', quantity: '2박스 · 60개' },
  { itemName: '수저', quantity: '1박스 · 50개' },
];

const PARTIAL_ZERO_ITEMS: OrderBoxItem[] = [
  { itemName: '식판', quantity: '5박스 · 125개' },
  { itemName: '국그릇', quantity: '주문 없음' },
  { itemName: '수저', quantity: '1박스 · 50개' },
];

const LONG_NAME_ITEMS: OrderBoxItem[] = [
  { itemName: '4찬 식판 A형 스테인리스 뚜껑 포함', quantity: '12박스 · 240개' },
  { itemName: '국그릇', quantity: '2박스 · 60개' },
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
    emptyLabel: {
      control: 'text',
      table: { defaultValue: { summary: ORDER_BOX_EMPTY_LABEL } },
    },
  },
  args: {
    items: ITEMS,
  },
  render: (args) => (
    <Flex className={ORDER_BOX_WIDTH_STYLE}>
      <OrderBox {...args} />
    </Flex>
  ),
} satisfies Meta<typeof OrderBox>;

export default meta;

type Story = StoryObj<typeof OrderBox>;

export const Default: Story = {};

export const Empty: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Flex align={{ items: 'start' }} gap='24'>
      <Flex align={{ items: 'start' }} direction='column' gap='12'>
        <Typography color='gray-500' variant='label-bold'>
          기본값
        </Typography>
        <Flex className={ORDER_BOX_WIDTH_STYLE}>
          <OrderBox items={[]} />
        </Flex>
      </Flex>
      <Flex align={{ items: 'start' }} direction='column' gap='12'>
        <Typography color='gray-500' variant='label-bold'>
          emptyLabel 지정
        </Typography>
        <Flex className={ORDER_BOX_WIDTH_STYLE}>
          <OrderBox emptyLabel={EMPTY_LABEL} items={[]} />
        </Flex>
      </Flex>
    </Flex>
  ),
};

export const PartialZero: Story = {
  args: {
    items: PARTIAL_ZERO_ITEMS,
  },
};

export const LongName: Story = {
  args: {
    items: LONG_NAME_ITEMS,
  },
};
