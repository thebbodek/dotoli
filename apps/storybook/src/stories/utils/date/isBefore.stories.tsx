import { Alert } from '@bbodek/internal-ui';
import {
  add,
  DATE_FORMATS,
  DATE_UNITS,
  DateIsBeforeParams,
  isBefore,
  now,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<DateIsBeforeParams> = {
  title: 'core/utils/date/isBefore',
  argTypes: {
    date: {
      description: 'Origin date value',
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
      description: 'Date unit of isBefore',
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
    isInclude: {
      control: 'boolean',
      description: 'Include target date in origin date',
      table: {
        defaultValue: {
          summary: 'true',
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
      date: add({
        date: now(),
        value: 1,
        unit: DATE_UNITS.DAY,
      }),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    unit: DATE_UNITS.DAY,
    isInclude: true,
  },
};

export default meta;

type Story = StoryObj<DateIsBeforeParams>;

export const Default: Story = {
  render: (args) => {
    return (
      <Alert
        content={`${isBefore({
          date: args.date,
          target: args.target,
          unit: args.unit,
          isInclude: args.isInclude,
        })}`}
      />
    );
  },
};
