import {
  Calendar,
  CALENDAR_VARIANTS,
  CalendarProvider,
  CalendarValue,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Calendar> = {
  title: 'core/internal-ui/Calendar',
  component: Calendar,
  argTypes: {
    minDate: {
      description: 'Minimum selectable date',
      control: 'date',
      type: { name: 'string', required: false },
    },
    maxDate: {
      description: 'Maximum selectable date',
      control: 'date',
      type: { name: 'string', required: false },
    },
    holidays: {
      description: 'Holidays (array of YYYY-MM-DD)',
      control: 'object',
      type: { name: 'other', required: false, value: 'CalendarDateValue[]' },
    },
    disabledDays: {
      description: 'Disabled dates (array of YYYY-MM-DD)',
      control: 'object',
      type: { name: 'other', required: false, value: 'CalendarDateValue[]' },
    },
    externalDaysLabels: {
      description: 'Labels to display on specific dates',
      control: 'object',
      type: {
        name: 'other',
        required: false,
        value: 'CalendarExternalDaysLabel[]',
      },
    },
    useWeekend: {
      description: 'Highlight weekends',
      control: 'boolean',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Single: Story = {
  render: (args) => {
    const [value, setValue] = useState<CalendarValue>(null);

    return (
      <CalendarProvider
        value={value}
        variant={CALENDAR_VARIANTS.SINGLE}
        onChange={setValue}
      >
        <Calendar
          minDate={args.minDate}
          maxDate={args.maxDate}
          holidays={args.holidays}
          disabledDays={args.disabledDays}
          externalDaysLabels={args.externalDaysLabels}
          useWeekend={args.useWeekend}
        />
      </CalendarProvider>
    );
  },
};

export const Range: Story = {
  render: (args) => {
    const [value, setValue] = useState<CalendarValue>(null);

    return (
      <CalendarProvider
        value={value}
        variant={CALENDAR_VARIANTS.RANGE}
        onChange={setValue}
      >
        <Calendar
          minDate={args.minDate}
          maxDate={args.maxDate}
          holidays={args.holidays}
          disabledDays={args.disabledDays}
          externalDaysLabels={args.externalDaysLabels}
          useWeekend={args.useWeekend}
        />
      </CalendarProvider>
    );
  },
};

export const Unbounded: Story = {
  render: (args) => {
    const [value, setValue] = useState<CalendarValue>(null);

    return (
      <CalendarProvider
        value={value}
        variant={CALENDAR_VARIANTS.UNBOUNDED}
        onChange={setValue}
      >
        <Calendar
          minDate={args.minDate}
          maxDate={args.maxDate}
          holidays={args.holidays}
          disabledDays={args.disabledDays}
          externalDaysLabels={args.externalDaysLabels}
          useWeekend={args.useWeekend}
        />
      </CalendarProvider>
    );
  },
};

export const WithMinMaxDate: Story = {
  render: (args) => {
    const [value, setValue] = useState<CalendarValue>(null);

    return (
      <CalendarProvider
        value={value}
        variant={CALENDAR_VARIANTS.RANGE}
        onChange={setValue}
      >
        <Calendar
          minDate={args.minDate ?? '2025-06-22'}
          maxDate={args.maxDate ?? '2025-08-05'}
          holidays={args.holidays}
          disabledDays={args.disabledDays}
          externalDaysLabels={args.externalDaysLabels}
          useWeekend={args.useWeekend}
        />
      </CalendarProvider>
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
      <CalendarProvider
        value={value}
        variant={CALENDAR_VARIANTS.SINGLE}
        onChange={setValue}
      >
        <Calendar
          minDate={args.minDate}
          maxDate={args.maxDate}
          holidays={args.holidays}
          disabledDays={args.disabledDays}
          externalDaysLabels={args.externalDaysLabels}
          useWeekend={args.useWeekend}
        />
      </CalendarProvider>
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
      <CalendarProvider
        value={value}
        variant={CALENDAR_VARIANTS.SINGLE}
        onChange={setValue}
      >
        <Calendar
          minDate={args.minDate}
          maxDate={args.maxDate}
          holidays={args.holidays}
          disabledDays={args.disabledDays}
          externalDaysLabels={args.externalDaysLabels}
          useWeekend={args.useWeekend}
        />
      </CalendarProvider>
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
      <CalendarProvider
        value={value}
        variant={CALENDAR_VARIANTS.SINGLE}
        onChange={setValue}
      >
        <Calendar
          minDate={args.minDate}
          maxDate={args.maxDate}
          holidays={args.holidays}
          disabledDays={args.disabledDays}
          externalDaysLabels={args.externalDaysLabels}
          useWeekend={args.useWeekend}
        />
      </CalendarProvider>
    );
  },
};
