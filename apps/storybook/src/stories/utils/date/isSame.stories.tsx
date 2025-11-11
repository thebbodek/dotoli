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

import { default as addMeta } from './add.stories';

const { date, unit } = addMeta.argTypes;

const meta = {
  title: 'core/utils/date/isSame',
  argTypes: {
    date,
    target: {
      ...date,
      description: 'Target date value',
    },
    unit: {
      ...unit,
      description: 'Date unit of isSame',
    },
  },
} satisfies Meta<DateIsSameParams>;

export default meta;

type Story = StoryObj<DateIsSameParams>;

export const Default: Story = {
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
