import { Alert } from '@bbodek/internal-ui';
import {
  date,
  DATE_FORMATS,
  DATE_PARSE_TYPES,
  DateParseType,
  DateToParseDateTypeParams,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<DateToParseDateTypeParams<DateParseType>> = {
  title: 'core/utils/date/toParseDateType',
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
    type: {
      control: 'select',
      description: 'Parse result type',
      options: Object.values(DATE_PARSE_TYPES),
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(DATE_PARSE_TYPES),
          }),
        },
      },
    },
  },
  args: {
    date: date.toString({
      date: date.now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    type: DATE_PARSE_TYPES.DAYJS,
  },
};

export default meta;

type Story = StoryObj<DateToParseDateTypeParams<DateParseType>>;

export const Default: Story = {
  render: (args) => {
    return (
      <Alert
        content={JSON.stringify(
          date.toParseDateType({
            date: args.date,
            type: args.type,
          }),
        )}
        theme='primary'
      />
    );
  },
};
