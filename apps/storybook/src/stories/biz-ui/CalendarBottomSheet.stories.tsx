import {
  CALENDAR_WEEK_START_DAYS,
  CalendarBottomSheet,
  CalendarBottomSheetProps,
  CtaButton,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const INITIAL_YEAR = 2026;

const MONTH_LIST = [6, 7, 8];

const HOLIDAYS = [
  '2026-06-06',
  '2026-06-07',
  '2026-06-13',
  '2026-06-14',
  '2026-06-20',
  '2026-06-21',
  '2026-06-27',
  '2026-06-28',
];

const DISABLED_DATES = ['2026-06-01', '2026-06-02', '2026-06-03'];

const TRIGGER_LABEL = '날짜 선택 열기';

const CONFIRM_LABEL = '확인';

const PAGE_STYLE =
  'flex-v-stack h-[720px] w-[380px] gap-[12px] bg-gray-50 p-[20px]';

const meta = {
  title: 'core/biz-ui/CalendarBottomSheet',
  component: CalendarBottomSheet,
  argTypes: {
    title: { control: 'text' },
    useWeekday: { control: 'boolean' },
    weekStartDay: {
      control: 'inline-radio',
      options: Object.values(CALENDAR_WEEK_START_DAYS),
      table: { defaultValue: { summary: CALENDAR_WEEK_START_DAYS.SUNDAY } },
    },
    isDimmed: { control: 'boolean' },
    calendarOption: {
      control: false,
      type: { name: 'object', required: true, value: {} },
      table: { type: { summary: 'CalendarProps' } },
    },
    dateSelectOption: { control: false },
    actionBarOption: { control: false },
  },
  args: {
    useWeekday: true,
    weekStartDay: CALENDAR_WEEK_START_DAYS.SUNDAY,
    isDimmed: true,
  },
} satisfies Meta<CalendarBottomSheetProps>;

export default meta;

type Story = StoryObj<CalendarBottomSheetProps>;

// 트리거로 연다 — autodocs가 모든 스토리를 한 번에 마운트하는데 열린 채로 두면
// 오버레이가 문서를 덮는다 (docs/biz-ui/components/confirm-modal.md 「Storybook」)
const useCalendarBottomSheet = ({ useRange }: { useRange: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState(INITIAL_YEAR);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const onDateClick = ({ dateString }: { dateString: string }) =>
    setSelectedDates((prev) => {
      if (prev.includes(dateString)) {
        return prev.filter((date) => date !== dateString);
      }

      return useRange && prev.length >= 2
        ? [dateString]
        : [...prev, dateString];
    });

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    dateSelectOption: {
      year,
      onPrevYear: () => setYear((prev) => prev - 1),
      onNextYear: () => setYear((prev) => prev + 1),
      onYearClick: () => {},
    },
    calendarOption: {
      months: MONTH_LIST.map((month) => ({ year, month })),
      selectedDates,
      holidays: HOLIDAYS,
      disabledDates: DISABLED_DATES,
      useRange,
      onDateClick,
    },
  };
};

export const Default: Story = {
  render: ({ title, useWeekday, weekStartDay, isDimmed }) => {
    const { isOpen, open, close, dateSelectOption, calendarOption } =
      useCalendarBottomSheet({ useRange: false });

    return (
      <div className={PAGE_STYLE}>
        <CtaButton label={TRIGGER_LABEL} onClick={open} />
        <CalendarBottomSheet
          actionBarOption={{ action: { label: CONFIRM_LABEL, onClick: close } }}
          calendarOption={calendarOption}
          dateSelectOption={dateSelectOption}
          isDimmed={isDimmed}
          isOpen={isOpen}
          title={title}
          useWeekday={useWeekday}
          weekStartDay={weekStartDay}
          onClose={close}
        />
      </div>
    );
  },
};

// 월요일 시작 — 요일 헤더와 날짜 격자가 같은 값을 받는다
export const MondayStart: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const { isOpen, open, close, dateSelectOption, calendarOption } =
      useCalendarBottomSheet({ useRange: false });

    return (
      <div className={PAGE_STYLE}>
        <CtaButton label={TRIGGER_LABEL} onClick={open} />
        <CalendarBottomSheet
          actionBarOption={{ action: { label: CONFIRM_LABEL, onClick: close } }}
          calendarOption={calendarOption}
          dateSelectOption={dateSelectOption}
          isOpen={isOpen}
          weekStartDay={CALENDAR_WEEK_START_DAYS.MONDAY}
          onClose={close}
        />
      </div>
    );
  },
};

// 기간 선택 — 두 날짜를 고르면 사이가 middle로 이어진다
export const Range: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const { isOpen, open, close, dateSelectOption, calendarOption } =
      useCalendarBottomSheet({ useRange: true });

    return (
      <div className={PAGE_STYLE}>
        <CtaButton label={TRIGGER_LABEL} onClick={open} />
        <CalendarBottomSheet
          actionBarOption={{ action: { label: CONFIRM_LABEL, onClick: close } }}
          calendarOption={calendarOption}
          dateSelectOption={dateSelectOption}
          isOpen={isOpen}
          onClose={close}
        />
      </div>
    );
  },
};

// 액션 바 없이 — 탭 즉시 확정되는 화면
export const WithoutAction: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const { isOpen, open, close, dateSelectOption, calendarOption } =
      useCalendarBottomSheet({ useRange: false });

    return (
      <div className={PAGE_STYLE}>
        <CtaButton label={TRIGGER_LABEL} onClick={open} />
        <CalendarBottomSheet
          calendarOption={calendarOption}
          dateSelectOption={dateSelectOption}
          isOpen={isOpen}
          onClose={close}
        />
      </div>
    );
  },
};
