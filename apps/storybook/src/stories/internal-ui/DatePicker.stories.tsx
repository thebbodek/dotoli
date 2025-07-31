import {
  CALENDAR_VARIANTS,
  CalendarValue,
  DatePicker,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof DatePicker> = {
  title: 'core/internal-ui/DatePicker',
  component: DatePicker,
  argTypes: {
    label: {
      description: 'Label',
      control: 'text',
      type: { name: 'string', required: false },
    },
    badge: {
      description: 'Badge next to the label (ReactNode)',
      control: 'text',
      type: { name: 'string', required: false },
    },
    disabled: {
      description: 'Disabled state',
      control: 'boolean',
      type: { name: 'boolean', required: false },
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    feedback: {
      description: 'Feedback message',
      control: 'text',
      type: { name: 'string', required: false },
    },
    required: {
      description: 'Required input',
      control: 'boolean',
      type: { name: 'boolean', required: false },
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    isError: {
      description: 'Error state',
      control: 'boolean',
      type: { name: 'boolean', required: false },
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    placeholder: {
      description: 'Placeholder',
      control: 'text',
      type: { name: 'string', required: false },
    },
    className: {
      description: 'Custom class name',
      control: 'text',
      type: { name: 'string', required: false },
    },
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
    variant: {
      description: 'Calendar selection type',
      control: 'select',
      options: [
        CALENDAR_VARIANTS.SINGLE,
        CALENDAR_VARIANTS.RANGE,
        CALENDAR_VARIANTS.UNBOUNDED,
      ],
      table: {
        type: {
          summary: 'CalendarVariants',
        },
      },
    },
    popoverOption: {
      description: 'Popover options',
      control: 'object',
      type: {
        name: 'other',
        value: 'PopoverProps',
        required: false,
      },
      table: {
        type: {
          summary: 'PopoverProps',
        },
      },
    },
  },
  args: {
    label: 'DatePicker',
  },
};

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
    externalDaysLabels: [{ date: '2025-08-12', label: '라벨' }],
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
