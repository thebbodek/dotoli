import {
  Flex,
  ORDER_INPUT_CARD_ACTION_LABELS,
  ORDER_INPUT_CARD_BADGE_THEMES,
  ORDER_INPUT_CARD_ORDER_STATUSES,
  OrderBoxItem,
  OrderInputCard,
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

const BADGE_THEME_OPTIONS = Object.values(ORDER_INPUT_CARD_BADGE_THEMES);

const CLOSED_CARDS: Pick<
  OrderInputCardProps,
  | 'dayLabel'
  | 'dateLabel'
  | 'isHoliday'
  | 'statusLabel'
  | 'badgeLabel'
  | 'badgeTheme'
>[] = [
  {
    dayLabel: '월',
    dateLabel: '9일',
    statusLabel: '주문이 마감된 날이에요',
  },
  {
    dayLabel: '수',
    dateLabel: '18일',
    badgeLabel: '주문중지',
    badgeTheme: ORDER_INPUT_CARD_BADGE_THEMES.GRAY,
  },
  {
    dayLabel: '토',
    dateLabel: '21일',
    isHoliday: true,
    badgeLabel: '이용 전',
    badgeTheme: ORDER_INPUT_CARD_BADGE_THEMES.GRAY,
  },
  {
    dayLabel: '금',
    dateLabel: '20일',
    badgeLabel: '서비스 해지',
    badgeTheme: ORDER_INPUT_CARD_BADGE_THEMES.GRAY,
  },
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
    isHoliday: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    statusLabel: { control: 'text', table: { type: { summary: 'string' } } },
    badgeLabel: {
      control: 'text',
      table: {
        defaultValue: {
          summary:
            ORDER_INPUT_CARD_ACTION_LABELS[
              ORDER_INPUT_CARD_ORDER_STATUSES.INPUT_CLOSED
            ],
        },
      },
    },
    badgeTheme: {
      control: 'inline-radio',
      options: BADGE_THEME_OPTIONS,
      table: { defaultValue: { summary: ORDER_INPUT_CARD_BADGE_THEMES.RED } },
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

export const StatusLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Flex direction='column' gap='12'>
      <OrderInputCard
        className={CARD_WIDTH_STYLE}
        dateLabel='12일'
        dayLabel='목'
        orderStatus={ORDER_INPUT_CARD_ORDER_STATUSES.INPUT_REQUIRED}
        statusLabel='오늘 18시 마감 · 입력 필요'
      />
      <OrderInputCard
        className={CARD_WIDTH_STYLE}
        dateLabel='21일'
        dayLabel='토'
        orderStatus={ORDER_INPUT_CARD_ORDER_STATUSES.INPUT_REQUIRED}
        statusLabel='목 18시 마감 · 입력 필요'
        isHoliday
      />
    </Flex>
  ),
};

export const ClosedBadge: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Flex direction='column' gap='12'>
      {CLOSED_CARDS.map((card) => (
        <OrderInputCard
          {...card}
          className={CARD_WIDTH_STYLE}
          key={card.dateLabel}
          orderStatus={ORDER_INPUT_CARD_ORDER_STATUSES.INPUT_CLOSED}
        />
      ))}
    </Flex>
  ),
};
