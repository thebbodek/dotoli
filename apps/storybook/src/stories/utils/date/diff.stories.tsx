import { Alert } from '@bbodek/internal-ui';
import { date, DATE_FORMATS, DATE_UNITS, DateDiffParams } from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<DateDiffParams> = {
  title: 'core/utils/date/diff',
  argTypes: {
    date: {
      description: 'Origin date value',
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
    target: {
      description: 'Target date value',
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
      description: 'Date unit of diff',
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
  },
  args: {
    date: date.toString({
      date: date.now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    target: date.toString({
      date: date.add({
        date: date.now(),
        value: 1,
        unit: DATE_UNITS.DAY,
      }),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    unit: DATE_UNITS.DAY,
  },
};

export default meta;

type Story = StoryObj<DateDiffParams>;

export const Default: Story = {
  render: (args) => {
    return (
      <Alert
        content={date.diff({
          date: args.date,
          target: args.target,
          unit: args.unit,
        })}
      />
    );
  },
};
