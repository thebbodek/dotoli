import { Alert } from '@bbodek/internal-ui';
import {
  add,
  compare,
  DATE_COMPARE_DIRECTIONS,
  DATE_FORMATS,
  DATE_UNITS,
  DateCompareParams,
  now,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

import { default as addMeta } from './add.stories';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const { date } = addMeta.argTypes;

const meta = {
  title: 'core/utils/date/compare',
  argTypes: {
    target: {
      ...date,
      description: 'Date value of compare from now',
    },
    direction: {
      control: 'select',
      description: 'Date direction of compare',
      options: Object.values(DATE_COMPARE_DIRECTIONS),
      type: {
        name: 'string',
        required: true,
      },
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(DATE_COMPARE_DIRECTIONS),
          }),
        },
      },
    },
    isRelative: {
      control: 'boolean',
      description: 'Compare without suffix',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
} satisfies Meta<DateCompareParams>;

export default meta;

type Story = StoryObj<DateCompareParams>;

export const Default: Story = {
  args: {
    target: toString({
      date: add({
        date: now(),
        value: 1,
        unit: DATE_UNITS.DAY,
      }),
      format: DATE_FORMATS['YYYY-MM-DD'],
    }),
    direction: DATE_COMPARE_DIRECTIONS.FROM_NOW,
    isRelative: false,
  },
  render: (args) => {
    return (
      <Alert
        content={compare({
          target: args.target,
          direction: args.direction,
          isRelative: args.isRelative,
        })}
      />
    );
  },
};
