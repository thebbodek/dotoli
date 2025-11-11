import { Alert } from '@bbodek/internal-ui';
import {
  add,
  DATE_FORMATS,
  DATE_IS_BETWEEN_RANGE,
  DATE_UNITS,
  DateIsBetweenParams,
  isBetween,
  now,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { default as addMeta } from './add.stories';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const { date, unit } = addMeta.argTypes;

const meta = {
  title: 'core/utils/date/isBetween',
  argTypes: {
    date,
    from: {
      ...date,
      description: 'From date value',
    },
    to: {
      ...date,
      description: 'To date value',
    },
    unit: {
      ...unit,
      description: 'Date unit of isBetween',
    },
    range: {
      control: 'select',
      description: 'Date range of isBetween',
      options: Object.values(DATE_IS_BETWEEN_RANGE),
      table: {
        defaultValue: {
          summary: DATE_IS_BETWEEN_RANGE.INCLUDE_INCLUDE,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(DATE_IS_BETWEEN_RANGE),
          }),
        },
      },
    },
  },
} satisfies Meta<DateIsBetweenParams>;

export default meta;

type Story = StoryObj<DateIsBetweenParams>;

export const Default: Story = {
  args: {
    date: toString({
      date: now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    from: toString({
      date: add({
        date: now(),
        value: 1,
        unit: DATE_UNITS.DAY,
      }),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    to: toString({
      date: add({
        date: now(),
        value: 2,
        unit: DATE_UNITS.DAY,
      }),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    unit: DATE_UNITS.DAY,
    range: DATE_IS_BETWEEN_RANGE.INCLUDE_INCLUDE,
  },
  render: (args) => {
    return (
      <Alert
        content={`${isBetween({
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
