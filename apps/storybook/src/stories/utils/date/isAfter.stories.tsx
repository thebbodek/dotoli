import { Alert } from '@bbodek/internal-ui';
import {
  add,
  DATE_FORMATS,
  DATE_UNITS,
  DateIsAfterParams,
  isAfter,
  now,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { default as addMeta } from './add.stories';

const { date, unit } = addMeta.argTypes;

const meta = {
  title: 'core/utils/date/isAfter',
  argTypes: {
    date: {
      ...date,
      description: 'Origin date value',
    },
    target: {
      ...date,
      description: 'Target date value',
    },
    unit: {
      ...unit,
      description: 'Date unit of isAfter',
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
} satisfies Meta<DateIsAfterParams>;

export default meta;

type Story = StoryObj<DateIsAfterParams>;

export const Default: Story = {
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
  render: (args) => {
    return (
      <Alert
        content={`${isAfter({
          date: args.date,
          target: args.target,
          unit: args.unit,
        })}`}
      />
    );
  },
};
