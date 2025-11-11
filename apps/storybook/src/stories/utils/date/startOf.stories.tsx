import { Alert } from '@bbodek/internal-ui';
import {
  DATE_FORMATS,
  DATE_UNITS,
  DateStartOfParams,
  now,
  startOf,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { default as addMeta } from './add.stories';

const { date, unit } = addMeta.argTypes;

const meta = {
  title: 'core/utils/date/startOf',
  argTypes: {
    date,
    unit: {
      ...unit,
      description: 'Date unit of startOf',
    },
  },
} satisfies Meta<DateStartOfParams>;

export default meta;

type Story = StoryObj<DateStartOfParams>;

export const Default: Story = {
  args: {
    date: toString({
      date: now(),
      format: DATE_FORMATS['YYYY.MM.DD.HH.mm.ss'],
    }),
    unit: DATE_UNITS.DAY,
  },
  render: (args) => {
    return (
      <Alert
        content={toString({
          date: startOf({
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
