import { Alert } from '@bbodek/internal-ui';
import {
  DATE_FORMATS,
  DATE_UNITS,
  DateSubtractParams,
  now,
  subtract,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<DateSubtractParams> = {
  title: 'core/utils/date/subtract',
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
      description: 'Date value',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    unit: {
      control: 'select',
      description: 'Date unit of subtract',
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
    date: toString({
      date: now(),
      format: DATE_FORMATS['YYYY.MM.DD.HH.mm.ss'],
    }),
    value: 1,
    unit: DATE_UNITS.DAY,
  },
};

export default meta;

type Story = StoryObj<DateSubtractParams>;

export const Default: Story = {
  render: (args) => {
    return (
      <Alert
        content={toString({
          date: subtract({
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
