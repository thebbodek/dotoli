import {
  CALENDAR_DAY_STATUSES,
  CalendarDayStatus,
  CalendarDayStatusProps,
  CalendarDayStatusType,
  Flex,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const CARD_BACKDROP = 'bg-blue-700 rounded-6 p-3';

const CELL_WIDTH_STYLE = 'w-[48px]';

const WEEK_STYLE = 'grid w-[340px] grid-cols-7 gap-1';

const HEAD_STYLE = 'w-[80px] shrink-0';

const { DONE, URGENT, EMPTY, UNAVAILABLE } = CALENDAR_DAY_STATUSES;

const STATUS_LABELS: Record<CalendarDayStatusType, string> = {
  [DONE]: '입력함',
  [URGENT]: '비어 있음, 오늘 마감',
  [EMPTY]: '비어 있음',
  [UNAVAILABLE]: '주문마감',
};

const DATE_SAMPLES = [undefined, 30];

const WEEKLY_ORDER_WEEK: CalendarDayStatusProps[] = [
  { date: 16, day: '월', status: UNAVAILABLE, statusLabel: '주문마감' },
  { date: 17, day: '화', status: URGENT, statusLabel: '비어 있음, 오늘 마감' },
  { date: 18, day: '수', status: EMPTY, statusLabel: '비어 있음' },
  { date: 19, day: '목', status: EMPTY, statusLabel: '비어 있음' },
  { date: 20, day: '금', status: EMPTY, statusLabel: '비어 있음' },
  { date: 21, day: '토', status: EMPTY, statusLabel: '비어 있음' },
  { date: 22, day: '일', status: EMPTY, statusLabel: '비어 있음' },
];

const FIXED_ORDER_WEEK: CalendarDayStatusProps[] = [
  { day: '월', status: DONE, statusLabel: '입력함' },
  { day: '화', status: DONE, statusLabel: '입력함' },
  { day: '수', status: DONE, statusLabel: '입력함' },
  { day: '목', status: DONE, statusLabel: '입력함' },
  { day: '금', status: DONE, statusLabel: '입력함' },
  { day: '토', status: UNAVAILABLE, statusLabel: '주문 없음' },
  { day: '일', status: UNAVAILABLE, statusLabel: '주문 없음' },
];

const meta = {
  title: 'core/biz-ui/CalendarDayStatus',
  component: CalendarDayStatus,
  argTypes: {
    day: { control: 'text', type: { name: 'string', required: true } },
    date: { control: 'number' },
    status: {
      control: 'inline-radio',
      options: Object.values(CALENDAR_DAY_STATUSES),
      type: { name: 'string', required: true },
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(CALENDAR_DAY_STATUSES),
          }),
        },
      },
    },
    statusLabel: {
      control: 'text',
      type: { name: 'string', required: true },
    },
  },
  args: {
    day: '화',
    date: 30,
    status: DONE,
    statusLabel: STATUS_LABELS[DONE],
  },
} satisfies Meta<typeof CalendarDayStatus>;

export default meta;

type Story = StoryObj<typeof CalendarDayStatus>;

export const Default: Story = {
  render: (args) => (
    <Flex className={CARD_BACKDROP} shrink='0'>
      <CalendarDayStatus {...args} className={CELL_WIDTH_STYLE} />
    </Flex>
  ),
};

export const Statuses: Story = {
  parameters: { controls: { disable: true } },
  render: ({ day }) => (
    <Flex className={CARD_BACKDROP} direction='column' gap='16' shrink='0'>
      {DATE_SAMPLES.map((date) => (
        <Flex align={{ items: 'center' }} gap='16' key={date ?? 'dayOnly'}>
          <Typography className={HEAD_STYLE} color='white' variant='label'>
            {date === undefined ? 'dayOnly' : 'dayDate'}
          </Typography>
          {Object.values(CALENDAR_DAY_STATUSES).map((status) => (
            <CalendarDayStatus
              className={CELL_WIDTH_STYLE}
              date={date}
              day={day}
              key={status}
              status={status}
              statusLabel={STATUS_LABELS[status]}
            />
          ))}
        </Flex>
      ))}
    </Flex>
  ),
};

export const WeeklyOrder: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Flex className={CARD_BACKDROP} shrink='0'>
      <div className={WEEK_STYLE}>
        {WEEKLY_ORDER_WEEK.map((item) => (
          <CalendarDayStatus key={item.day} {...item} />
        ))}
      </div>
    </Flex>
  ),
};

export const FixedOrder: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Flex className={CARD_BACKDROP} shrink='0'>
      <div className={WEEK_STYLE}>
        {FIXED_ORDER_WEEK.map((item) => (
          <CalendarDayStatus key={item.day} {...item} />
        ))}
      </div>
    </Flex>
  ),
};
