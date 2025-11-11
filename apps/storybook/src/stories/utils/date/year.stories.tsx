import { Alert } from '@bbodek/internal-ui';
import {
  DATE_FORMATS,
  DateYearParams,
  now,
  toString,
  year,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { default as addMeta } from './add.stories';

const { date } = addMeta.argTypes;

const meta = {
  title: 'core/utils/date/year',
  argTypes: {
    date,
  },
} satisfies Meta<DateYearParams>;

export default meta;

type Story = StoryObj<DateYearParams>;

export const Default: Story = {
  args: {
    date: toString({
      date: now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
  },
  render: (args) => {
    return <Alert content={year({ date: args.date })} />;
  },
};
