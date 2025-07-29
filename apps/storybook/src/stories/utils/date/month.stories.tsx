import { Alert } from '@bbodek/internal-ui';
import { date, DATE_FORMATS, DateMonthParams } from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<DateMonthParams> = {
  title: 'core/utils/date/month',
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

type Story = StoryObj<DateMonthParams>;

export const Default: Story = {
  render: (args) => {
    return <Alert content={date.month({ date: args.date })} />;
  },
};
