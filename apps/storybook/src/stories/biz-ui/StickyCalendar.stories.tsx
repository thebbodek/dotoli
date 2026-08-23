import {
  Calendar,
  StickyCalendar,
  StickyCalendarProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const INITIAL_YEAR = 2026;

const SCREEN_WIDTH_STYLE = 'w-[380px] outline outline-gray-200';

const LIST_STYLE = 'flex-v-stack gap-[20px]';

const GROUP_STYLE = 'flex-v-stack gap-[8px]';

const SCROLL_PAGE_STYLE =
  'scroll-y flex-v-stack h-[420px] w-[380px] bg-white outline outline-gray-200';

const BODY_STYLE = 'shrink-0 px-[20px]';

const START_MONTH = 6;

// 한 달치로는 420px 컨테이너를 못 넘겨 sticky가 드러나지 않는다
const MONTH_COUNT = 3;

const meta = {
  title: 'core/biz-ui/StickyCalendar',
  component: StickyCalendar,
  argTypes: {
    useWeekday: {
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    dateSelectOption: { control: false },
  },
  args: {
    useWeekday: true,
  },
} satisfies Meta<StickyCalendarProps>;

export default meta;

type Story = StoryObj<StickyCalendarProps>;

const useYear = () => {
  const [year, setYear] = useState(INITIAL_YEAR);

  return {
    year,
    onPrevYear: () => setYear((prev) => prev - 1),
    onNextYear: () => setYear((prev) => prev + 1),
    onYearClick: () => {},
  };
};

export const Default: Story = {
  render: ({ useWeekday }) => {
    const dateSelectOption = useYear();

    return (
      <div className={SCREEN_WIDTH_STYLE}>
        <StickyCalendar
          dateSelectOption={dateSelectOption}
          useWeekday={useWeekday}
        />
      </div>
    );
  },
};

// dateSelectOption 유무가 Figma의 useDateSelect 축을 대신합니다.
// 둘 다 없는 조합은 Figma에 없습니다 (빈 바가 됨)
export const Combinations: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const dateSelectOption = useYear();

    return (
      <div className={LIST_STYLE}>
        <div className={GROUP_STYLE}>
          <Typography color='gray-500' variant='label-bold'>
            dateSelectOption · useWeekday
          </Typography>
          <div className={SCREEN_WIDTH_STYLE}>
            <StickyCalendar dateSelectOption={dateSelectOption} useWeekday />
          </div>
        </div>
        <div className={GROUP_STYLE}>
          <Typography color='gray-500' variant='label-bold'>
            dateSelectOption
          </Typography>
          <div className={SCREEN_WIDTH_STYLE}>
            <StickyCalendar
              dateSelectOption={dateSelectOption}
              useWeekday={false}
            />
          </div>
        </div>
        <div className={GROUP_STYLE}>
          <Typography color='gray-500' variant='label-bold'>
            useWeekday
          </Typography>
          <div className={SCREEN_WIDTH_STYLE}>
            <StickyCalendar useWeekday />
          </div>
        </div>
      </div>
    );
  },
};

// 날짜 격자가 바 밑으로 지나가는지 본다 — sticky top-0과 z-10이 드러나는 유일한 자리
export const Sticky: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const dateSelectOption = useYear();
    const months = Array.from({ length: MONTH_COUNT }, (_, index) => ({
      year: dateSelectOption.year,
      month: START_MONTH + index,
    }));

    return (
      <div className={SCROLL_PAGE_STYLE}>
        <StickyCalendar dateSelectOption={dateSelectOption} useWeekday />
        <div className={BODY_STYLE}>
          <Calendar months={months} />
        </div>
      </div>
    );
  },
};
