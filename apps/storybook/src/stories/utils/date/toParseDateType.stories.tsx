import { Alert } from '@bbodek/internal-ui';
import {
  DATE_FORMATS,
  DATE_PARSE_TYPES,
  DateParseType,
  DateToParseDateTypeParams,
  now,
  toParseDateType,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';
import { default as addMeta } from './add.stories';

const { date } = addMeta.argTypes;

const meta = {
  title: 'core/utils/date/toParseDateType',
  argTypes: {
    date,
    type: {
      control: 'select',
      description: 'Parse result type',
      options: Object.values(DATE_PARSE_TYPES),
      type: {
        name: 'other',
        value: 'DateParseType',
        required: true,
      },
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(DATE_PARSE_TYPES),
          }),
        },
      },
    },
  },
} satisfies Meta<DateToParseDateTypeParams<DateParseType>>;

export default meta;

type Story = StoryObj<DateToParseDateTypeParams<DateParseType>>;

export const Default: Story = {
  args: {
    date: toString({
      date: now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    type: DATE_PARSE_TYPES.DAYJS,
  },
  render: (args) => {
    return (
      <Alert
        content={JSON.stringify(
          toParseDateType({
            date: args.date,
            type: args.type,
          }),
        )}
        theme='primary'
      />
    );
  },
};
