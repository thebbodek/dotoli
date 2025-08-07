import { Alert } from '@bbodek/internal-ui';
import { date, DATE_FORMATS, DateDateParams } from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<DateDateParams> = {
  title: 'core/utils/date/date',
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
    date: date.toString({
      date: date.now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
  },
};

export default meta;

type Story = StoryObj<DateDateParams>;

export const Default: Story = {
  render: (args) => {
    return <Alert content={date.date({ date: args.date })} />;
  },
};
