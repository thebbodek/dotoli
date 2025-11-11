import { Alert } from '@bbodek/internal-ui';
import {
  DATE_FORMATS,
  DATE_UNITS,
  DateSetParams,
  now,
  set,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { default as addMeta } from './add.stories';

const { date, value, unit } = addMeta.argTypes;

const meta = {
  title: 'core/utils/date/set',
  argTypes: {
    date,
    value: {
      ...value,
      description: 'Date value',
    },
    unit: {
      ...unit,
      description: 'Date unit of set',
    },
  },
} satisfies Meta<DateSetParams>;

export default meta;

type Story = StoryObj<DateSetParams>;

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
          date: set({
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
