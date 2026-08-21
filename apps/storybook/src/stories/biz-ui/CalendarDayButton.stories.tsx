import {
  CALENDAR_DAY_SELECTED_TYPES,
  CalendarDayButton,
  CalendarDayButtonProps,
  CalendarDaySelectedType,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const DAY = '월';

const DATE = 29;

const LIST_STYLE = 'flex-v-stack gap-[24px]';

const ROW_STYLE = 'flex-h-stack items-center gap-[12px]';

const GROUP_STYLE = 'flex-v-stack gap-[8px]';

const CELL_STYLE = 'flex-v-stack items-center gap-[4px]';

const RANGE_ROW_STYLE = 'flex-h-stack w-fit';

const HEAD_STYLE = 'w-[120px] shrink-0';

const DISABLED_HOLIDAY_COMBINATIONS = [
  { disabled: false, isHoliday: false, label: 'default' },
  { disabled: false, isHoliday: true, label: 'isHoliday' },
  { disabled: true, isHoliday: false, label: 'disabled' },
  { disabled: true, isHoliday: true, label: 'disabled+홀리데이' },
];

// dateOnly만 5개 값을 전부 갖습니다 (Figma 세트에 dayOnly · dayDate의 range 심볼이 없음)
const RANGE_SEQUENCE: readonly {
  date: number;
  selectedType: CalendarDaySelectedType;
  isHoliday?: boolean;
}[] = [
  { date: 12, selectedType: CALENDAR_DAY_SELECTED_TYPES.NONE },
  { date: 13, selectedType: CALENDAR_DAY_SELECTED_TYPES.START },
  { date: 14, selectedType: CALENDAR_DAY_SELECTED_TYPES.MIDDLE },
  { date: 15, selectedType: CALENDAR_DAY_SELECTED_TYPES.MIDDLE },
  {
    date: 16,
    selectedType: CALENDAR_DAY_SELECTED_TYPES.MIDDLE,
    isHoliday: true,
  },
  { date: 17, selectedType: CALENDAR_DAY_SELECTED_TYPES.END },
  { date: 18, selectedType: CALENDAR_DAY_SELECTED_TYPES.NONE, isHoliday: true },
];

const meta = {
  title: 'core/biz-ui/CalendarDayButton',
  component: CalendarDayButton,
  argTypes: {
    day: { control: 'text' },
    date: { control: 'number' },
    selectedType: {
      control: 'inline-radio',
      options: Object.values(CALENDAR_DAY_SELECTED_TYPES),
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(CALENDAR_DAY_SELECTED_TYPES),
          }),
        },
        defaultValue: { summary: CALENDAR_DAY_SELECTED_TYPES.NONE },
      },
    },
    isHoliday: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { action: 'click' },
  },
  args: {
    day: DAY,
    date: DATE,
    selectedType: CALENDAR_DAY_SELECTED_TYPES.NONE,
    isHoliday: false,
    disabled: false,
  },
} satisfies Meta<CalendarDayButtonProps>;

export default meta;

type Story = StoryObj<CalendarDayButtonProps>;

export const Default: Story = {};

// day · date 유무가 Figma의 type 축(dayOnly · dayDate · dateOnly)을 대신합니다
export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onClick }) => (
    <div className={LIST_STYLE}>
      {Object.values([
        CALENDAR_DAY_SELECTED_TYPES.NONE,
        CALENDAR_DAY_SELECTED_TYPES.SELECTED,
      ]).map((selectedType) => (
        <div className={GROUP_STYLE} key={selectedType}>
          <Typography color='gray-500' variant='label-bold'>
            {selectedType}
          </Typography>
          <div className={ROW_STYLE}>
            <div className={CELL_STYLE}>
              <CalendarDayButton
                day={DAY}
                selectedType={selectedType}
                onClick={onClick}
              />
              <Typography color='gray-400' variant='caption'>
                dayOnly
              </Typography>
            </div>
            <div className={CELL_STYLE}>
              <CalendarDayButton
                date={DATE}
                day={DAY}
                selectedType={selectedType}
                onClick={onClick}
              />
              <Typography color='gray-400' variant='caption'>
                dayDate
              </Typography>
            </div>
            <div className={CELL_STYLE}>
              <CalendarDayButton
                date={DATE}
                selectedType={selectedType}
                onClick={onClick}
              />
              <Typography color='gray-400' variant='caption'>
                dateOnly
              </Typography>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

// disabled + isHoliday가 dateOnly에서만 red-200이 되는 것을 본다
// (dayDate는 gray-400 — docs/biz-ui/components/calendar.md 「디자인 확인 필요」)
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onClick }) => (
    <div className={LIST_STYLE}>
      {Object.values(CALENDAR_DAY_SELECTED_TYPES).map((selectedType) => (
        <div className={GROUP_STYLE} key={selectedType}>
          <Typography color='gray-500' variant='label-bold'>
            {selectedType}
          </Typography>
          <div className={ROW_STYLE}>
            {DISABLED_HOLIDAY_COMBINATIONS.map(
              ({ disabled, isHoliday, label }) => (
                <div className={CELL_STYLE} key={label}>
                  <div className={ROW_STYLE}>
                    <CalendarDayButton
                      date={DATE}
                      day={DAY}
                      disabled={disabled}
                      isHoliday={isHoliday}
                      selectedType={selectedType}
                      onClick={onClick}
                    />
                    <CalendarDayButton
                      date={DATE}
                      disabled={disabled}
                      isHoliday={isHoliday}
                      selectedType={selectedType}
                      onClick={onClick}
                    />
                  </div>
                  <Typography color='gray-400' variant='caption'>
                    {label}
                  </Typography>
                </div>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  ),
};

// start의 왼쪽 · end의 오른쪽만 둥글고 middle은 각져서 띠가 이어지는지 본다
export const Range: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onClick }) => (
    <div className={GROUP_STYLE}>
      <Typography className={HEAD_STYLE} color='gray-500' variant='label-bold'>
        dateOnly · range
      </Typography>
      <div className={RANGE_ROW_STYLE}>
        {RANGE_SEQUENCE.map(({ date, selectedType, isHoliday }) => (
          <CalendarDayButton
            date={date}
            isHoliday={isHoliday}
            key={date}
            selectedType={selectedType}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  ),
};
