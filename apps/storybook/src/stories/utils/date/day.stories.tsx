import { Alert } from '@bbodek/internal-ui';
import { date, DATE_FORMATS, DateDayParams } from '@bbodek/utils';
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
        value: 'string | number | Date | Dayjs',
      },
      table: {
        type: {
          summary: 'string | number | Date | Dayjs',
        },
      },
    },
  },
  args: {
    date: date.toString({
      date: date.now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
  },
};

export default meta;

type Story = StoryObj<DateDayParams>;

export const Default: Story = {
  render: (args) => {
    return <Alert content={date.day({ date: args.date })} />;
  },
};
