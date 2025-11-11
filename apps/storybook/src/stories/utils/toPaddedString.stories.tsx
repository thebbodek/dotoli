import { Typography } from '@bbodek/internal-ui';
import { toPaddedString, ToPaddedStringParams } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

const meta = {
  title: 'core/utils/toPaddedString',
  argTypes: {
    number: {
      control: 'number',
      type: { name: 'number', required: true },
    },
    length: {
      control: 'number',
      type: 'number',
      table: {
        defaultValue: {
          summary: '8',
        },
      },
    },
  },
} satisfies Meta<ToPaddedStringParams>;

export default meta;

type Story = StoryObj<ToPaddedStringParams>;

export const Default: Story = {
  args: {
    number: 1,
    length: 8,
  },
  render: (args) => {
    const [options, setOptions] = useState(args);

    useEffect(() => {
      setOptions(args);
    }, [args]);

    return <Typography>변환 결과: {toPaddedString(options)}</Typography>;
  },
};
