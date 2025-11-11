import { Alert } from '@bbodek/internal-ui';
import {
  DATE_FORMATS,
  DateTimeZoneParams,
  now,
  timezone,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { default as isValidMeta } from './isValid.stories';

const { date, format } = isValidMeta.argTypes;

const meta = {
  title: 'core/utils/date/timezone',
  argTypes: {
    date: {
      ...date,
      type: {
        ...date.type,
        required: false,
      },
    },
    format: {
      ...format,
      description: 'Date format of timezone',
    },
    isStrict: {
      control: 'boolean',
      description: 'Strict of date',
    },
  },
} satisfies Meta<DateTimeZoneParams>;

export default meta;

type Story = StoryObj<DateTimeZoneParams>;

export const Default: Story = {
  args: {
    date: toString({
      date: now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    format: DATE_FORMATS['YYYY-MM-DD'],
    isStrict: false,
  },
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
