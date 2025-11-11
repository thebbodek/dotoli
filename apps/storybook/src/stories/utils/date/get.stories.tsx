import { Alert } from '@bbodek/internal-ui';
import {
  DATE_FORMATS,
  DATE_UNITS,
  DateGetParams,
  get,
  now,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { default as addMeta } from './add.stories';

const { date, unit } = addMeta.argTypes;

const meta = {
  title: 'core/utils/date/get',
  argTypes: {
    date,
    unit: {
      ...unit,
      description: 'Date unit of get',
    },
  },
} satisfies Meta<DateGetParams>;

export default meta;

type Story = StoryObj<DateGetParams>;

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
        content={JSON.stringify(
          get({
            date: args.date,
            unit: args.unit,
          }),
        )}
        theme='primary'
      />
    );
  },
};
