import {
  Flex,
  ORDER_BOX_EMPTY_LABEL,
  OrderBox,
  OrderBoxItem,
  OrderBoxProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

const ORDER_BOX_WIDTH_STYLE = 'w-[338px]';

const CLOSED_EMPTY_LABEL = '주문이 마감된 날이에요';

const ITEMS: OrderBoxItem[] = [
  { packageName: '4찬 식판', boxCount: 4, unitCount: 80 },
  { packageName: '국그릇', boxCount: 2, unitCount: 60 },
  { packageName: '수저', boxCount: 1, unitCount: 50 },
];

const PARTIAL_ZERO_ITEMS: OrderBoxItem[] = [
  { packageName: '4찬 식판', boxCount: 4, unitCount: 80 },
  { packageName: '국그릇', boxCount: 0, unitCount: 0 },
  { packageName: '수저', boxCount: 0, unitCount: 0 },
];

const LONG_NAME_ITEMS: OrderBoxItem[] = [
  {
    packageName: '4찬 식판 A형 스테인리스 뚜껑 포함',
    boxCount: 12,
    unitCount: 240,
  },
  { packageName: '국그릇', boxCount: 2, unitCount: 60 },
];

interface EmptyCase extends Pick<OrderBoxProps, 'emptyLabel'> {
  title: string;
}

const EMPTY_CASES: EmptyCase[] = [
  { title: '기본값' },
  { title: 'emptyLabel 지정', emptyLabel: CLOSED_EMPTY_LABEL },
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

export const Empty: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Flex direction='column' gap='24'>
      {EMPTY_CASES.map(({ title, emptyLabel }) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={title}
        >
          <Typography color='gray-500' variant='label-bold'>
            {title}
          </Typography>
          <Flex className={ORDER_BOX_WIDTH_STYLE}>
            <OrderBox emptyLabel={emptyLabel} items={[]} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};
