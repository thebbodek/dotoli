import { Alert } from '@bbodek/internal-ui';
import { DATE_FORMATS, DateToStringParams, now, toString } from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<DateToStringParams> = {
  title: 'core/utils/date/toString',
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
    format: {
      control: 'select',
      description: 'Result format',
      options: Object.keys(DATE_FORMATS),
      table: {
        defaultValue: {
          summary: DATE_FORMATS['YYYY-MM-DD'],
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.keys(DATE_FORMATS),
          }),
        },
      },
    },
  },
  args: {
    date: toString({
      date: now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    format: DATE_FORMATS['YYYY-MM-DD'],
  },
};

export default meta;

type Story = StoryObj<DateToStringParams>;

export const Default: Story = {
  render: (args) => {
    return (
      <Alert
        content={toString({
          date: args.date,
          format: args.format,
        })}
        theme='primary'
      />
    );
  },
};
