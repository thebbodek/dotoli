import { Alert } from '@bbodek/internal-ui';
import {
  DATE_FORMATS,
  DateMonthParams,
  month,
  now,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { default as addMeta } from './add.stories';

const { date } = addMeta.argTypes;

const meta = {
  title: 'core/utils/date/month',
  argTypes: {
    date,
  },
} satisfies Meta<DateMonthParams>;

export default meta;

type Story = StoryObj<DateMonthParams>;

export const Default: Story = {
  args: {
    date: toString({
      date: now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
  },
  render: (args) => {
    return <Alert content={month({ date: args.date })} />;
  },
};
