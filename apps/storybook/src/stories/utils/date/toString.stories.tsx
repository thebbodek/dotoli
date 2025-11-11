import { Alert } from '@bbodek/internal-ui';
import { DATE_FORMATS, DateToStringParams, now, toString } from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { default as isValidMeta } from './isValid.stories';

const { date, format } = isValidMeta.argTypes;

const meta = {
  title: 'core/utils/date/toString',
  argTypes: {
    date,
    format: {
      ...format,
      description: 'Result format',
    },
  },
} satisfies Meta<DateToStringParams>;

export default meta;

type Story = StoryObj<DateToStringParams>;

export const Default: Story = {
  args: {
    date: toString({
      date: now(),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    format: DATE_FORMATS['YYYY-MM-DD'],
  },
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
