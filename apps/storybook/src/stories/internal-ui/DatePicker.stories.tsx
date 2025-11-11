import {
  CALENDAR_VARIANTS,
  CalendarValue,
  DatePicker,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';
import { default as calendarMeta } from './Calendar.stories';
import { default as selectMeta } from './Select/Select.stories';

const { minDate, maxDate, holidays, disabledDays, externalDaysLabels } =
  calendarMeta.argTypes;
const {
  label,
  disabled,
  feedback,
  required,
  isError,
  placeholder,
  className,
  popoverOption,
  badge,
  hiddenLabel,
} = selectMeta.argTypes;

const meta = {
  title: 'core/internal-ui/DatePicker',
  component: DatePicker,
  argTypes: {
    label,
    value: {
      description: 'DatePicker value',
      type: { name: 'other', value: 'CalendarValue', required: true },
      table: {
        type: {
          summary: 'CalendarValue',
        },
      },
    },
    variant: {
      description: 'Calendar selection type',
      control: 'select',
      options: Object.values(CALENDAR_VARIANTS),
      type: {
        name: 'string',
        required: true,
      },
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(CALENDAR_VARIANTS),
          }),
        },
      },
    },
    onChange: {
      description: 'DatePicker onChange',
      type: { name: 'function', required: true },
    },
    minDate,
    maxDate,
    holidays,
    disabledDays,
    externalDaysLabels,
    badge,
    hiddenLabel,
    disabled,
    feedback,
    required,
    isError,
    placeholder,
    popoverOption,
    className,
  },
  args: {
    label: 'DatePicker',
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Single: Story = {
  render: (args) => {
    const [value, setValue] = useState<CalendarValue>(null);

    return (
      <DatePicker
        {...args}
        variant={CALENDAR_VARIANTS.SINGLE}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Range: Story = {
  render: (args) => {
    const [value, setValue] = useState<CalendarValue>(null);

    return (
      <DatePicker
        {...args}
        variant={CALENDAR_VARIANTS.RANGE}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Unbounded: Story = {
  render: (args) => {
    const [value, setValue] = useState<CalendarValue>(null);

    return (
      <DatePicker
        {...args}
        variant={CALENDAR_VARIANTS.UNBOUNDED}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithMinMaxDate: Story = {
  render: (args) => {
    const [value, setValue] = useState<CalendarValue>(null);

    return (
      <DatePicker
        {...args}
        variant={CALENDAR_VARIANTS.RANGE}
        minDate={args.minDate ?? '2025-06-22'}
        maxDate={args.maxDate ?? '2025-08-05'}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithHolidays: Story = {
  args: {
    holidays: ['2025-08-11', '2025-08-12'],
    disabledDays: ['2025-08-12'],
  },
  render: (args) => {
    const [value, setValue] = useState<CalendarValue>(null);

    return (
      <DatePicker
        {...args}
        variant={CALENDAR_VARIANTS.SINGLE}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithDisabledDays: Story = {
  args: {
    disabledDays: ['2025-08-12'],
  },
  render: (args) => {
    const [value, setValue] = useState<CalendarValue>(null);

    return (
      <DatePicker
        {...args}
        variant={CALENDAR_VARIANTS.SINGLE}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithExternalDaysLabels: Story = {
  args: {
    externalDaysLabels: [{ dateValue: '2025-08-12', label: '라벨' }],
  },
  render: (args) => {
    const [value, setValue] = useState<CalendarValue>(null);

    return (
      <DatePicker
        {...args}
        variant={CALENDAR_VARIANTS.SINGLE}
        value={value}
        onChange={setValue}
      />
    );
  },
};
