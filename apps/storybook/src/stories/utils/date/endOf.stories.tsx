import { Alert } from '@bbodek/internal-ui';
import {
  DATE_FORMATS,
  DATE_UNITS,
  DateEndOfParams,
  endOf,
  now,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<DateEndOfParams> = {
  title: 'core/utils/date/endOf',
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
    unit: {
      control: 'select',
      description: 'Date unit of endOf',
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
    unit: DATE_UNITS.DAY,
  },
};

export default meta;

type Story = StoryObj<DateEndOfParams>;

export const Default: Story = {
  render: (args) => {
    return (
      <Alert
        content={toString({
          date: endOf({
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
