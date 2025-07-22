import { Typography } from '@bbodek/internal-ui';
import { toPaddedString } from '@bbodek/utils';
import type { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';

const meta: Meta = {
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

export const Default = {
  args: {
    number: 1,
    length: 8,
  },
  render: ({ number, length }: keyof typeof meta.argTypes) => {
    const [str, setStr] = useState(number);
    const [len, setLen] = useState(length);

    useEffect(() => {
      setStr(number);
      setLen(length);
    }, [number, length]);

    return <Typography>변환 결과: {toPaddedString(str, len)}</Typography>;
  },
};
