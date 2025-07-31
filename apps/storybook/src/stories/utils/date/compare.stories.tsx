import { Alert } from '@bbodek/internal-ui';
import {
  date,
  DATE_COMPARE_DIRECTIONS,
  DATE_FORMATS,
  DATE_UNITS,
  DateCompareParams,
} from '@bbodek/utils';

import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<DateCompareParams> = {
  title: 'core/utils/date/compare',
  argTypes: {
    target: {
      description: 'Date value of compare from now',
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
    direction: {
      control: 'select',
      description: 'Date direction of compare',
      options: Object.values(DATE_COMPARE_DIRECTIONS),
      type: {
        required: true,
        name: 'other',
        value: 'DateCompareDirection',
      },
      table: {
        type: {
          summary: 'DateCompareDirection',
        },
      },
    },
    isRelative: {
      control: 'boolean',
      description: 'Compare without suffix',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  args: {
    target: date.toString({
      date: date.add({
        date: date.now(),
        value: 1,
        unit: DATE_UNITS.DAY,
      }),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    direction: DATE_COMPARE_DIRECTIONS.FROM_NOW,
    isRelative: false,
  },
};

export default meta;

type Story = StoryObj<DateCompareParams>;

export const Default: Story = {
  render: (args) => {
    return (
      <Alert
        content={date.compare({
          target: args.target,
          direction: args.direction,
          isRelative: args.isRelative,
        })}
      />
    );
  },
};
