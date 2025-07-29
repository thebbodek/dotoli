import { Alert } from '@bbodek/internal-ui';
import {
  date,
  DATE_FORMATS,
  DATE_UNITS,
  DateMinMaxParams,
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
      date.now(),
      date.add({ date: date.now(), value: 1, unit: DATE_UNITS.DAY }),
      date.subtract({ date: date.now(), value: 1, unit: DATE_UNITS.DAY }),
    ],
  },
};

export default meta;

type Story = StoryObj<DateMinMaxParams>;

export const MinMax: Story = {
  render: (args) => {
    const { min, max } = date.minMax(args);
    const minString = date.toString({
      date: min,
      format: DATE_FORMATS['YYYY-MM-DD'],
    });
    const maxString = date.toString({
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
        content={date.toString({
          date: date.min(args),
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
        content={date.toString({
          date: date.max(args),
          format: DATE_FORMATS['YYYY-MM-DD'],
        })}
      />
    );
  },
};
