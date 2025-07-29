import { Alert } from '@bbodek/internal-ui';
import {
  date,
  DATE_FORMATS,
  DATE_IS_BETWEEN_RANGE,
  DATE_UNITS,
  DateIsBetweenParams,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<DateIsBetweenParams> = {
  title: 'core/utils/date/isBetween',
  argTypes: {
    date: {
      description: 'Date value',
      control: {
        type: 'text',
      },
      type: {
        required: true,
        name: 'other',
        value: 'string | number | Date | Dayjs',
      },
      table: {
        type: {
          summary: 'string | number | Date | Dayjs',
        },
      },
    },
    from: {
      description: 'From date value',
      control: {
        type: 'text',
      },
      type: {
        required: true,
        name: 'other',
        value: 'string | number | Date | Dayjs',
      },
      table: {
        type: {
          summary: 'string | number | Date | Dayjs',
        },
      },
    },
    to: {
      description: 'To date value',
      control: {
        type: 'text',
      },
      type: {
        required: true,
        name: 'other',
        value: 'string | number | Date | Dayjs',
      },
      table: {
        type: {
          summary: 'string | number | Date | Dayjs',
        },
      },
    },
    unit: {
      control: 'select',
      description: 'Date unit of isBetween',
      options: Object.values(DATE_UNITS),
      table: {
        defaultValue: {
          summary: DATE_UNITS.DAY,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(DATE_UNITS),
          }),
        },
      },
    },
    range: {
      control: 'select',
      description: 'Date range of isBetween',
      options: Object.values(DATE_IS_BETWEEN_RANGE),
      table: {
        defaultValue: {
          summary: DATE_IS_BETWEEN_RANGE.INCLUDE_INCLUDE,
        },
      },
    },
  },
  args: {
    date: date.toString({
      date: date.now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    from: date.toString({
      date: date.add({
        date: date.now(),
        value: 1,
        unit: DATE_UNITS.DAY,
      }),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    to: date.toString({
      date: date.add({
        date: date.now(),
        value: 2,
        unit: DATE_UNITS.DAY,
      }),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    unit: DATE_UNITS.DAY,
    range: DATE_IS_BETWEEN_RANGE.INCLUDE_INCLUDE,
  },
};

export default meta;

type Story = StoryObj<DateIsBetweenParams>;

export const Default: Story = {
  render: (args) => {
    return (
      <Alert
        content={`${date.isBetween({
          date: args.date,
          from: args.from,
          to: args.to,
          unit: args.unit,
          range: args.range,
        })}`}
      />
    );
  },
};
