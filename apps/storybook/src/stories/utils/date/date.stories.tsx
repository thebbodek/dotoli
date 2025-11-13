import { Alert } from '@bbodek/internal-ui';
import {
  date,
  DATE_FORMATS,
  DateDateParams,
  now,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { default as addMeta } from './add.stories';

const { date: dateArgType } = addMeta.argTypes;

const meta = {
  title: 'core/utils/date/date',
  argTypes: {
    date: dateArgType,
  },
} satisfies Meta<DateDateParams>;

export default meta;

type Story = StoryObj<DateDateParams>;

export const Default: Story = {
  args: {
    date: toString({
      date: now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
  },
  render: (args) => {
    return <Alert content={date({ date: args.date })} />;
  },
};
