import {
  CTA_BUTTON_SIZES,
  CTA_BUTTON_VARIANTS,
  CtaButton,
  DATE_BOTTOM_SHEET_MONTH_OPTIONS,
  DATE_BOTTOM_SHEET_TITLES,
  DATE_BOTTOM_SHEET_TYPES,
  DateBottomSheet,
  DateBottomSheetProps,
  DateBottomSheetType,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const INITIAL_YEAR = 2026;

const INITIAL_MONTH = 6;

// 「노출 개수는 사용자 가입일 등 이용 연수에 따라 가변된다 · 최신 연도 내림차순」 (BIL-003)
const YEAR_OPTIONS = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

const TRIGGER_LABEL = '열기';

const CONFIRM_LABEL = '선택';

const TITLE_DEFAULT_SUMMARY = Object.values(DATE_BOTTOM_SHEET_TITLES).join(
  ' · ',
);

const LINK_LABEL = '전체 거래명세서 보기';

const LINK_ICON_KEY = 'receipt';

const PAGE_STYLE =
  'flex-v-stack h-[620px] w-[380px] gap-[12px] bg-gray-50 p-[20px]';

const meta = {
  title: 'core/biz-ui/DateBottomSheet',
  component: DateBottomSheet,
  argTypes: {
    type: {
      control: 'inline-radio',
      options: Object.values(DATE_BOTTOM_SHEET_TYPES),
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(DATE_BOTTOM_SHEET_TYPES),
          }),
        },
        defaultValue: { summary: DATE_BOTTOM_SHEET_TYPES.MONTH },
      },
    },
    title: {
      control: 'text',
      table: { defaultValue: { summary: TITLE_DEFAULT_SUMMARY } },
    },
    options: {
      control: 'object',
      type: {
        name: 'array',
        required: true,
        value: { name: 'number' },
      },
      table: { type: { summary: 'number[]' } },
    },
    // 칩을 눌러 바뀌는 값이라 스토리가 state로 들고 있다
    value: {
      control: false,
      type: { name: 'number', required: true },
      table: { type: { summary: 'number' } },
    },
    isDimmed: {
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    dateSelectOption: { control: false },
    actionBarOption: { control: false },
  },
  args: {
    type: DATE_BOTTOM_SHEET_TYPES.MONTH,
    options: DATE_BOTTOM_SHEET_MONTH_OPTIONS,
    value: INITIAL_MONTH,
    isDimmed: true,
  },
} satisfies Meta<DateBottomSheetProps>;

export default meta;

type Story = StoryObj<DateBottomSheetProps>;

export const Month: Story = {
  render: ({ type, title, options, isDimmed }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [year, setYear] = useState(INITIAL_YEAR);
    const [month, setMonth] = useState(INITIAL_MONTH);
    const close = () => setIsOpen(false);

    return (
      <div className={PAGE_STYLE}>
        <CtaButton label={TRIGGER_LABEL} onClick={() => setIsOpen(true)} />
        <DateBottomSheet
          actionBarOption={{
            subAction: {
              label: LINK_LABEL,
              size: CTA_BUTTON_SIZES.SM,
              variant: CTA_BUTTON_VARIANTS.TEXT,
              iconOption: { iconKey: LINK_ICON_KEY },
              onClick: () => {},
            },
            action: { label: CONFIRM_LABEL, onClick: close },
          }}
          dateSelectOption={{
            year,
            onPrevYear: () => setYear((prev) => prev - 1),
            onNextYear: () => setYear((prev) => prev + 1),
            onYearClick: () => {},
          }}
          isDimmed={isDimmed}
          isOpen={isOpen}
          options={options}
          title={title}
          type={type}
          value={month}
          onChange={({ value }) => setMonth(value)}
          onClose={close}
        />
      </div>
    );
  },
};

export const Year: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [year, setYear] = useState(INITIAL_YEAR);
    const close = () => setIsOpen(false);

    return (
      <div className={PAGE_STYLE}>
        <CtaButton label={TRIGGER_LABEL} onClick={() => setIsOpen(true)} />
        <DateBottomSheet
          actionBarOption={{ action: { label: CONFIRM_LABEL, onClick: close } }}
          isOpen={isOpen}
          options={YEAR_OPTIONS}
          type={DATE_BOTTOM_SHEET_TYPES.YEAR}
          value={year}
          onChange={({ value }) => setYear(value)}
          onClose={close}
        />
      </div>
    );
  },
};

// 월 시트의 26년▼ 탭 → 연도 시트. Figma에 연결 정의가 없어 구현으로 확인하는 자리다
// 시트는 하나만 마운트하고 내용만 갈아 끼운다 — 둘로 나눠 isOpen을 번갈아 켜면
// Overlay가 언마운트돼 슬라이드업과 딤이 다시 재생된다 (calendar.md 「연결」)
export const Linked: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<DateBottomSheetType>(
      DATE_BOTTOM_SHEET_TYPES.MONTH,
    );
    const [year, setYear] = useState(INITIAL_YEAR);
    const [month, setMonth] = useState(INITIAL_MONTH);

    const isYear = view === DATE_BOTTOM_SHEET_TYPES.YEAR;
    const backToMonth = () => setView(DATE_BOTTOM_SHEET_TYPES.MONTH);
    const close = () => setIsOpen(false);

    return (
      <div className={PAGE_STYLE}>
        <CtaButton
          label={TRIGGER_LABEL}
          onClick={() => {
            backToMonth();
            setIsOpen(true);
          }}
        />
        <DateBottomSheet
          actionBarOption={{
            action: {
              label: CONFIRM_LABEL,
              onClick: isYear ? backToMonth : close,
            },
          }}
          dateSelectOption={
            isYear
              ? undefined
              : {
                  year,
                  onPrevYear: () => setYear((prev) => prev - 1),
                  onNextYear: () => setYear((prev) => prev + 1),
                  onYearClick: () => setView(DATE_BOTTOM_SHEET_TYPES.YEAR),
                }
          }
          isOpen={isOpen}
          options={isYear ? YEAR_OPTIONS : DATE_BOTTOM_SHEET_MONTH_OPTIONS}
          type={view}
          value={isYear ? year : month}
          onChange={({ value }) => {
            if (isYear) {
              setYear(value);

              return;
            }

            setMonth(value);
          }}
          onClose={isYear ? backToMonth : close}
        />
      </div>
    );
  },
};
