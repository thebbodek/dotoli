import { Alert } from '@bbodek/internal-ui';
import {
  DATE_FORMATS,
  DATE_UNITS,
  DateIsSameParams,
  isSame,
  now,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<DateIsSameParams> = {
  title: 'core/utils/date/isSame',
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
    target: {
      description: 'Target date value',
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
      description: 'Date unit of isSame',
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
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    target: toString({
      date: now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    unit: DATE_UNITS.DAY,
  },
};

export default meta;

type Story = StoryObj<DateIsSameParams>;

export const Default: Story = {
  render: (args) => {
    return (
      <Alert
        content={`${isSame({
          date: args.date,
          target: args.target,
          unit: args.unit,
        })}`}
      />
    );
  },
};
