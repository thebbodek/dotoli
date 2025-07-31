import { Typography } from '@bbodek/internal-ui';
import { toPaddedString, ToPaddedStringParams } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

const meta: Meta<ToPaddedStringParams> = {
  title: 'core/utils/toPaddedString',
  argTypes: {
    number: {
      control: 'number',
      type: 'number',
    },
    length: {
      control: 'number',
      type: 'number',
    },
  },
};

export default meta;

type Story = StoryObj<ToPaddedStringParams>;

export const Default: Story = {
  args: {
    number: 1,
    length: 8,
  },
  render: ({ number, length }: ToPaddedStringParams) => {
    const [str, setStr] = useState(number);
    const [len, setLen] = useState(length);

    useEffect(() => {
      setStr(number);
      setLen(length);
    }, [number, length]);

    return (
      <Typography>
        변환 결과: {toPaddedString({ number: str, length: len })}
      </Typography>
    );
  },
};
