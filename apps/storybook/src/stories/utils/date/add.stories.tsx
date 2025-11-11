import { Alert } from '@bbodek/internal-ui';
import {
  add,
  DATE_FORMATS,
  DATE_UNITS,
  DateAddParams,
  now,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const DATE_TYPE = 'string | number | DateValue';

const meta = {
  title: 'core/utils/date/add',
  argTypes: {
    date: {
      description: 'Date value',
      control: 'text',
      type: {
        name: 'other',
        value: DATE_TYPE,
        required: true,
      },
      table: {
        type: {
          summary: DATE_TYPE,
        },
      },
    },
    value: {
      control: 'number',
      description: 'Date value of add',
      type: { name: 'number', required: true },
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
} satisfies Meta<DateAddParams>;

export default meta;

type Story = StoryObj<DateAddParams>;

export const Default: Story = {
  args: {
    date: toString({
      date: now(),
      format: DATE_FORMATS['YYYY.MM.DD.HH.mm.ss'],
    }),
    value: 1,
    unit: DATE_UNITS.DAY,
  },
  render: (args) => {
    return (
      <Alert
        content={toString({
          date: add({
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
