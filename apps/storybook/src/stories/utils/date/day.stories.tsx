import { Alert } from '@bbodek/internal-ui';
import { DATE_FORMATS, DateDayParams, day, now, toString } from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<DateDayParams> = {
  title: 'core/utils/date/day',
  argTypes: {
    date: {
      description: 'Date value',
      control: {
        type: 'text',
      },
      type: {
        required: true,
        name: 'other',
        value: 'string | number | DateValue',
      },
      table: {
        type: {
          summary: 'string | number | DateValue',
        },
      },
    },
  },
  args: {
    date: toString({
      date: now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
  },
};

export default meta;

type Story = StoryObj<DateDayParams>;

export const Default: Story = {
  render: (args) => {
    return <Alert content={day({ date: args.date })} />;
  },
};
