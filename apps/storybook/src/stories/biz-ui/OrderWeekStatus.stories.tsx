import {
  Flex,
  ORDER_WEEK_STATUS_DAY_STATUSES,
  ORDER_WEEK_STATUS_SIZES,
  OrderWeekStatus,
  OrderWeekStatusDayItem,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const CARD_BACKDROP = 'bg-blue-700 rounded-6 p-3';

const CARD_WIDTH_STYLE = 'w-[300px]';

const { ORDERED, UNORDERED, DEADLINE_PASSED, SUSPENDED, NO_ORDER } =
  ORDER_WEEK_STATUS_DAY_STATUSES;

const WEEK: OrderWeekStatusDayItem[] = [
  { date: 16, dayLabel: '월', status: ORDERED },
  { date: 17, dayLabel: '화', status: ORDERED },
  { date: 18, dayLabel: '수', status: ORDERED },
  { date: 19, dayLabel: '목', status: ORDERED },
  { date: 20, dayLabel: '금', status: UNORDERED },
  { date: 21, dayLabel: '토', status: UNORDERED },
  { date: 22, dayLabel: '일', status: UNORDERED },
];

const STATUS_WEEK: OrderWeekStatusDayItem[] = [
  { date: 16, dayLabel: '월', status: ORDERED },
  { date: 17, dayLabel: '화', status: UNORDERED },
  { date: 18, dayLabel: '수', status: DEADLINE_PASSED },
  { date: 19, dayLabel: '목', status: SUSPENDED },
  { date: 20, dayLabel: '금', status: NO_ORDER },
  { date: 21, dayLabel: '토', status: ORDERED },
  { date: 22, dayLabel: '일', status: NO_ORDER },
];

const FIXED_WEEK: OrderWeekStatusDayItem[] = [
  { dayLabel: '월', status: ORDERED },
  { dayLabel: '화', status: ORDERED },
  { dayLabel: '수', status: ORDERED },
  { dayLabel: '목', status: ORDERED },
  { dayLabel: '금', status: ORDERED },
  { dayLabel: '토', status: NO_ORDER },
  { dayLabel: '일', status: NO_ORDER },
];

const SUSPENDED_WEEK: OrderWeekStatusDayItem[] = [
  { date: 7, dayLabel: '월', status: SUSPENDED },
  { date: 8, dayLabel: '화', status: SUSPENDED },
  { date: 9, dayLabel: '수', status: SUSPENDED },
  { date: 10, dayLabel: '목', status: SUSPENDED },
  { date: 11, dayLabel: '금', status: SUSPENDED },
  { date: 12, dayLabel: '토', status: SUSPENDED },
  { date: 13, dayLabel: '일', status: SUSPENDED },
];

const meta = {
  title: 'core/biz-ui/Order/OrderWeekStatus',
  component: OrderWeekStatus,
  argTypes: {
    days: {
      control: 'object',
      type: {
        name: 'array',
        required: true,
        value: { name: 'object', value: {} },
      },
      table: {
        type: { summary: 'OrderWeekStatusDayItem[]' },
      },
    },
    size: {
      control: 'inline-radio',
      options: Object.values(ORDER_WEEK_STATUS_SIZES),
      table: {
        defaultValue: { summary: ORDER_WEEK_STATUS_SIZES.LG },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(ORDER_WEEK_STATUS_SIZES),
          }),
        },
      },
    },
    'aria-label': {
      control: 'text',
    },
  },
  args: {
    days: WEEK,
    'aria-label': '16일부터 22일까지 주문 현황',
  },
} satisfies Meta<typeof OrderWeekStatus>;

export default meta;

type Story = StoryObj<typeof OrderWeekStatus>;

export const Default: Story = {
  render: (args) => (
    <Flex className={CARD_BACKDROP} shrink='0'>
      <OrderWeekStatus {...args} className={CARD_WIDTH_STYLE} />
    </Flex>
  ),
};

export const Statuses: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Flex className={CARD_BACKDROP} shrink='0'>
      <OrderWeekStatus className={CARD_WIDTH_STYLE} days={STATUS_WEEK} />
    </Flex>
  ),
};

export const Fixed: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Flex className={CARD_BACKDROP} shrink='0'>
      <OrderWeekStatus className={CARD_WIDTH_STYLE} days={FIXED_WEEK} />
    </Flex>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Flex direction='column' gap='24'>
      {Object.values(ORDER_WEEK_STATUS_SIZES).map((size) => (
        <Flex direction='column' gap='12' key={size}>
          <Typography color='gray-500' variant='label-bold'>
            size = {size}
          </Typography>
          <Flex className={CARD_BACKDROP} shrink='0'>
            <OrderWeekStatus
              className={CARD_WIDTH_STYLE}
              days={WEEK}
              size={size}
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Suspended: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Flex className={CARD_BACKDROP} shrink='0'>
      <OrderWeekStatus className={CARD_WIDTH_STYLE} days={SUSPENDED_WEEK} />
    </Flex>
  ),
};
