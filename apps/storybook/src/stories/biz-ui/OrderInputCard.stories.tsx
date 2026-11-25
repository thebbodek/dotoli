import {
  Flex,
  ORDER_DATE_INFO_DAY_TYPES,
  ORDER_INPUT_CARD_ORDER_STATUSES,
  OrderBoxItem,
  OrderDateInfoDayType,
  OrderInputCard,
  OrderInputCardOrderStatus,
  OrderInputCardProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

const ITEMS: OrderBoxItem[] = [
  { packageName: '4찬 식판', boxCount: 4, unitCount: 80 },
  { packageName: '국그릇', boxCount: 0, unitCount: 0 },
  { packageName: '수저', boxCount: 0, unitCount: 0 },
];

const CARD_WIDTH_STYLE = 'w-[340px]';

const ORDER_STATUSES = Object.values(ORDER_INPUT_CARD_ORDER_STATUSES);

const DAY_TYPE_OPTIONS = Object.values(ORDER_DATE_INFO_DAY_TYPES);

const DAY_TYPE_LABELS: Record<OrderDateInfoDayType, string> = {
  [ORDER_DATE_INFO_DAY_TYPES.WEEKDAY]: '평일',
  [ORDER_DATE_INFO_DAY_TYPES.WEEKEND]: '휴일',
  [ORDER_DATE_INFO_DAY_TYPES.PUBLIC_HOLIDAY]: '공휴일',
};

const LOCKED_DESCRIPTION = '주문이 마감된 날이에요';

const DESCRIPTIONS: Partial<Record<OrderInputCardOrderStatus, string>> = {
  [ORDER_INPUT_CARD_ORDER_STATUSES.UNSET]: '오늘 18시 마감 · 입력 필요',
  [ORDER_INPUT_CARD_ORDER_STATUSES.ZERO]: '주문 없음',
};

const DAY_LABELS: Record<OrderInputCardOrderStatus, string> = {
  [ORDER_INPUT_CARD_ORDER_STATUSES.UNSET]: '수',
  [ORDER_INPUT_CARD_ORDER_STATUSES.ZERO]: '토',
  [ORDER_INPUT_CARD_ORDER_STATUSES.ORDERED]: '월',
};

const LOCKED_CARDS: Pick<
  OrderInputCardProps,
  'dayLabel' | 'dateLabel' | 'dayType' | 'description'
>[] = [
  { dayLabel: '수', dateLabel: '18일', description: '주문중지' },
  {
    dayLabel: '토',
    dateLabel: '21일',
    description: '이용 전',
    dayType: ORDER_DATE_INFO_DAY_TYPES.WEEKEND,
  },
  { dayLabel: '금', dateLabel: '20일', description: '서비스 해지' },
];

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
    description: { control: 'text', table: { type: { summary: 'string' } } },
    isLocked: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    dayType: {
      control: 'inline-radio',
      options: DAY_TYPE_OPTIONS,
      table: { defaultValue: { summary: ORDER_DATE_INFO_DAY_TYPES.WEEKDAY } },
    },
    items: {
      control: 'object',
      table: { type: { summary: 'OrderBoxItem[]' } },
    },
    onAction: { action: 'action' },
  },
  args: {
    orderStatus: ORDER_INPUT_CARD_ORDER_STATUSES.ORDERED,
    dayLabel: '월',
    dateLabel: '16일',
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
      {[false, true].map((isLocked) =>
        DAY_TYPE_OPTIONS.map((dayType) => (
          <Flex
            align={{ items: 'start' }}
            gap='16'
            key={`${isLocked}-${dayType}`}
          >
            {ORDER_STATUSES.map((orderStatus) => (
              <Flex
                align={{ items: 'start' }}
                direction='column'
                gap='8'
                key={orderStatus}
              >
                <Typography color='gray-500' variant='label-bold'>
                  {orderStatus} · {DAY_TYPE_LABELS[dayType]} ·{' '}
                  {isLocked ? '잠김' : '열림'}
                </Typography>
                <OrderInputCard
                  dayLabel={
                    dayType === ORDER_DATE_INFO_DAY_TYPES.WEEKDAY
                      ? DAY_LABELS[orderStatus]
                      : '일'
                  }
                  description={
                    isLocked ? LOCKED_DESCRIPTION : DESCRIPTIONS[orderStatus]
                  }
                  className={CARD_WIDTH_STYLE}
                  dateLabel='16일'
                  dayType={dayType}
                  isLocked={isLocked}
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

export const LockedReasons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Flex direction='column' gap='12'>
      {LOCKED_CARDS.map((card) => (
        <OrderInputCard
          {...card}
          className={CARD_WIDTH_STYLE}
          key={card.dateLabel}
          orderStatus={ORDER_INPUT_CARD_ORDER_STATUSES.UNSET}
          isLocked
        />
      ))}
    </Flex>
  ),
};
