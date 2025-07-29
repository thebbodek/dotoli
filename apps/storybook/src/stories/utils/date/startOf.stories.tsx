import { Alert } from '@bbodek/internal-ui';
import {
  date,
  DATE_FORMATS,
  DATE_UNITS,
  DateStartOfParams,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<DateStartOfParams> = {
  title: 'core/utils/date/startOf',
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
    unit: {
      control: 'select',
      description: 'Date unit of startOf',
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
      format: DATE_FORMATS['YYYY.MM.DD.HH.mm.ss'],
    }),
    unit: DATE_UNITS.DAY,
  },
};

export default meta;

type Story = StoryObj<DateStartOfParams>;

export const Default: Story = {
  render: (args) => {
    return (
      <Alert
        content={date.toString({
          date: date.startOf({
            date: args.date,
            unit: args.unit,
          }),
          format: DATE_FORMATS['YYYY.MM.DD.HH.mm.ss'],
        })}
        theme='primary'
      />
    );
  },
};
