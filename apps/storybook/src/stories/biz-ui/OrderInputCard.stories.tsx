import {
  Flex,
  ORDER_INPUT_CARD_ORDER_STATUSES,
  OrderInputCard,
  OrderInputCardItem,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

const ITEMS: OrderInputCardItem[] = [
  { name: '4찬 식판 A형 (20입)', quantity: 3 },
  { name: '빈박스 (1입)', quantity: 0 },
  { name: '검은 빈박스 (1입)', quantity: 0 },
];

const CARD_WIDTH_STYLE = 'w-[340px]';

const ORDER_STATUSES = Object.values(ORDER_INPUT_CARD_ORDER_STATUSES);

const meta = {
  title: 'core/biz-ui/Order/OrderInputCard',
  component: OrderInputCard,
  argTypes: {
    orderStatus: {
      control: 'inline-radio',
      options: ORDER_STATUSES,
      type: { name: 'string', required: true },
    },
    dayLabel: { control: 'text', type: { name: 'string', required: true } },
    dateLabel: { control: 'text', table: { type: { summary: 'string' } } },
    isHoliday: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    items: {
      control: 'object',
      table: { type: { summary: 'OrderInputCardItem[]' } },
    },
    onAction: { action: 'action' },
  },
  args: {
    orderStatus: ORDER_INPUT_CARD_ORDER_STATUSES.COMPLETED,
    dayLabel: '월',
    dateLabel: '29일',
    items: ITEMS,
  },
} satisfies Meta<typeof OrderInputCard>;

export default meta;

type Story = StoryObj<typeof OrderInputCard>;

export const Default: Story = {
  render: (args) => <OrderInputCard {...args} className={CARD_WIDTH_STYLE} />,
};

export const Matrix: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: ({ items, onAction }) => (
    <Flex direction='column' gap='24'>
      {[false, true].map((isHoliday) =>
        [true, false].map((hasDate) => (
          <Flex
            align={{ items: 'start' }}
            gap='16'
            key={`${isHoliday}-${hasDate}`}
          >
            {ORDER_STATUSES.map((orderStatus) => (
              <Flex
                align={{ items: 'start' }}
                direction='column'
                gap='8'
                key={orderStatus}
              >
                <Typography color='gray-500' variant='label-bold'>
                  {orderStatus} · {isHoliday ? '휴일' : '평일'} ·{' '}
                  {hasDate ? '날짜' : '날짜없음'}
                </Typography>
                <OrderInputCard
                  className={CARD_WIDTH_STYLE}
                  dateLabel={hasDate ? '29일' : undefined}
                  dayLabel={isHoliday ? '일' : '수'}
                  isHoliday={isHoliday}
                  items={items}
                  orderStatus={orderStatus}
                  onAction={onAction}
                />
              </Flex>
            ))}
          </Flex>
        )),
      )}
    </Flex>
  ),
};
