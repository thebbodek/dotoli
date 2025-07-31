import { Alert } from '@bbodek/internal-ui';
import {
  add,
  DATE_FORMATS,
  DATE_UNITS,
  DateMinMaxParams,
  max,
  min,
  minMax,
  now,
  subtract,
  toString,
} from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<DateMinMaxParams> = {
  title: 'core/utils/date/minmax',
  argTypes: {
    dates: {
      description: 'Dates value',
      type: {
        required: true,
        name: 'other',
        value: 'DateType[]',
      },
      table: {
        type: {
          summary: 'DateType[]',
        },
      },
    },
  },
  args: {
    dates: [
      now(),
      add({ date: now(), value: 1, unit: DATE_UNITS.DAY }),
      subtract({ date: now(), value: 1, unit: DATE_UNITS.DAY }),
    ],
  },
};

export default meta;

type Story = StoryObj<DateMinMaxParams>;

export const MinMax: Story = {
  render: (args) => {
    const { min, max } = minMax(args);
    const minString = toString({
      date: min,
      format: DATE_FORMATS['YYYY-MM-DD'],
    });
    const maxString = toString({
      date: max,
      format: DATE_FORMATS['YYYY-MM-DD'],
    });

    return <Alert content={`min: ${minString} | max: ${maxString}`} />;
  },
};

export const Min: Story = {
  render: (args) => {
    return (
      <Alert
        content={toString({
          date: min(args),
          format: DATE_FORMATS['YYYY-MM-DD'],
        })}
      />
    );
  },
};

export const Max: Story = {
  render: (args) => {
    return (
      <Alert
        content={toString({
          date: max(args),
          format: DATE_FORMATS['YYYY-MM-DD'],
        })}
      />
    );
  },
};
