import { Alert } from '@bbodek/internal-ui';
import { date, DATE_FORMATS, DATE_UNITS, DateAddParams } from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<DateAddParams> = {
  title: 'core/utils/date/add',
  argTypes: {
    date: {
      description: 'Date value',
      control: {
        type: 'text',
      },
      type: {
        required: true,
        name: 'other',
        value: 'string | number | DateValue',
      },
      table: {
        type: {
          summary: 'string | number | DateValue',
        },
      },
    },
    value: {
      control: 'number',
      description: 'Date value of add',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    unit: {
      control: 'select',
      description: 'Date unit of add',
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
    value: 1,
    unit: DATE_UNITS.DAY,
  },
};

export default meta;

type Story = StoryObj<DateAddParams>;

export const Default: Story = {
  render: (args) => {
    return (
      <Alert
        content={date.toString({
          date: date.add({
            date: args.date,
            value: args.value,
            unit: args.unit,
          }),
          format: DATE_FORMATS['YYYY.MM.DD.HH.mm.ss'],
        })}
        theme='primary'
      />
    );
  },
};
