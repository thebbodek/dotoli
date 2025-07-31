import { Alert } from '@bbodek/internal-ui';
import {
  DATE_FORMATS,
  DateTimeZoneParams,
  now,
  timezone,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<DateTimeZoneParams> = {
  title: 'core/utils/date/timezone',
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
      description: 'Date format of timezone',
      options: Object.keys(DATE_FORMATS),
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.keys(DATE_FORMATS),
          }),
        },
      },
    },
    isStrict: {
      control: 'boolean',
      description: 'Strict of date',
      table: {
        type: {
          summary: 'boolean',
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
    isStrict: false,
  },
};

export default meta;

type Story = StoryObj<DateTimeZoneParams>;

export const Default: Story = {
  render: (args) => {
    return (
      <Alert
        content={toString({
          date: timezone({
            date: args.date,
            format: args.format,
            isStrict: args.isStrict,
          }),
          format: DATE_FORMATS['YYYY-MM-DD'],
        })}
        theme='primary'
      />
    );
  },
};
