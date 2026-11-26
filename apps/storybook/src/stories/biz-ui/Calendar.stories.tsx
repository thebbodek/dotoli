import {
  Calendar,
  CALENDAR_WEEK_START_DAYS,
  CalendarProps,
  StickyCalendar,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const MONTHS = [
  { year: 2026, month: 6 },
  { year: 2026, month: 7 },
];

// 주말은 컴포넌트가 스스로 붉게 칠하므로 holidays에는 평일 공휴일만 넣는다
const HOLIDAYS = ['2026-06-25'];

const DISABLED_DATES = ['2026-06-01', '2026-06-02', '2026-06-03'];

const RANGE = ['2026-06-13', '2026-06-19'];

const SINGLE = ['2026-06-29'];

const SCREEN_STYLE = 'w-[380px] bg-white px-[20px] outline outline-gray-200';

const SCROLL_PAGE_STYLE =
  'scroll-y flex-v-stack h-[520px] w-[380px] bg-white outline outline-gray-200';

const SCROLL_BODY_STYLE = 'shrink-0 px-[20px]';

const LIST_STYLE = 'flex-v-stack gap-[20px]';

const WEEK_START_PAGE_STYLE =
  'flex-v-stack w-[380px] bg-white outline outline-gray-200';

// 6월은 월요일, 11월은 일요일로 시작해 앞 빈 칸이 0개 · 6개로 갈린다
const WEEK_START_MONTHS = [
  { year: 2026, month: 6 },
  { year: 2026, month: 11 },
];

const GROUP_STYLE = 'flex-v-stack gap-[8px]';

const meta = {
  title: 'core/biz-ui/Calendar',
  component: Calendar,
  argTypes: {
    months: {
      control: 'object',
      type: {
        name: 'array',
        required: true,
        value: { name: 'object', value: {} },
      },
      table: { type: { summary: 'CalendarMonthValue[]' } },
    },
    selectedDates: { control: 'object' },
    holidays: { control: 'object' },
    disabledDates: { control: 'object' },
    useRange: { control: 'boolean' },
    weekStartDay: {
      control: 'inline-radio',
      options: Object.values(CALENDAR_WEEK_START_DAYS),
      table: { defaultValue: { summary: CALENDAR_WEEK_START_DAYS.SUNDAY } },
    },
    onDateClick: { action: 'dateClick' },
  },
  args: {
    months: MONTHS,
    holidays: HOLIDAYS,
    disabledDates: DISABLED_DATES,
    selectedDates: SINGLE,
    useRange: false,
    weekStartDay: CALENDAR_WEEK_START_DAYS.SUNDAY,
  },
} satisfies Meta<CalendarProps>;

export default meta;

type Story = StoryObj<CalendarProps>;

export const Default: Story = {
  render: (args) => (
    <div className={SCREEN_STYLE}>
      <Calendar {...args} />
    </div>
  ),
};

// useRange가 selectedDates의 처음과 끝을 start · end로 잡고 사이를 middle로 채운다
export const Range: Story = {
  parameters: { controls: { disable: true } },
  render: ({ months, holidays, disabledDates }) => (
    <div className={LIST_STYLE}>
      <div className={GROUP_STYLE}>
        <Typography color='gray-500' variant='label-bold'>
          useRange=false · 고른 날짜만 selected
        </Typography>
        <div className={SCREEN_STYLE}>
          <Calendar
            disabledDates={disabledDates}
            holidays={holidays}
            months={months}
            selectedDates={RANGE}
          />
        </div>
      </div>
      <div className={GROUP_STYLE}>
        <Typography color='gray-500' variant='label-bold'>
          useRange=true · 사이가 middle로 이어짐
        </Typography>
        <div className={SCREEN_STYLE}>
          <Calendar
            disabledDates={disabledDates}
            holidays={holidays}
            months={months}
            selectedDates={RANGE}
            useRange
          />
        </div>
      </div>
    </div>
  ),
};

// 실제 조합 — StickyCalendar가 위에 붙고 월이 이어서 스크롤된다
export const WithStickyCalendar: Story = {
  parameters: { controls: { disable: true } },
  render: ({ holidays, disabledDates }) => {
    const [year, setYear] = useState(2026);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);

    const onDateClick = ({ dateString }: { dateString: string }) =>
      setSelectedDates((prev) =>
        prev.includes(dateString)
          ? prev.filter((date) => date !== dateString)
          : [...prev, dateString],
      );

    return (
      <div className={SCROLL_PAGE_STYLE}>
        <StickyCalendar
          dateSelectOption={{
            year,
            onPrevYear: () => setYear((prev) => prev - 1),
            onNextYear: () => setYear((prev) => prev + 1),
            onYearClick: () => {},
          }}
          useWeekday
        />
        <div className={SCROLL_BODY_STYLE}>
          <Calendar
            disabledDates={disabledDates}
            holidays={holidays}
            months={[6, 7, 8].map((month) => ({ year, month }))}
            selectedDates={selectedDates}
            onDateClick={onDateClick}
          />
        </div>
      </div>
    );
  },
};

// 시작 요일만 바꿔 나란히 둔다 — 빈 칸 수 · 요일 헤더 순서 · 주말 색이 함께 따라오는지 본다
export const WeekStartDay: Story = {
  parameters: { controls: { disable: true } },
  render: ({ holidays, disabledDates }) => (
    <div className={LIST_STYLE}>
      {Object.values(CALENDAR_WEEK_START_DAYS).map((weekStartDay) => (
        <div className={GROUP_STYLE} key={weekStartDay}>
          <Typography color='gray-500' variant='label-bold'>
            {`weekStartDay=${weekStartDay}`}
          </Typography>
          <div className={WEEK_START_PAGE_STYLE}>
            <StickyCalendar weekStartDay={weekStartDay} useWeekday />
            <div className={SCROLL_BODY_STYLE}>
              <Calendar
                disabledDates={disabledDates}
                holidays={holidays}
                months={WEEK_START_MONTHS}
                weekStartDay={weekStartDay}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
