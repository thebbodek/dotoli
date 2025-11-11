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

import { default as isAfterMeta } from './isAfter.stories';

const { date, target, unit, isInclude } = isAfterMeta.argTypes;

const meta = {
  title: 'core/utils/date/isBefore',
  argTypes: {
    date,
    target,
    unit: {
      ...unit,
      description: 'Date unit of isBefore',
    },
    isInclude,
  },
} satisfies Meta<DateIsBeforeParams>;

export default meta;

type Story = StoryObj<DateIsBeforeParams>;

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
