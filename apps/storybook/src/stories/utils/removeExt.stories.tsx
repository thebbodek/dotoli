import { Button, Flex, Typography } from '@bbodek/internal-ui';
import { ExtFnProps, removeExt } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { default as extractExtMeta } from './extractExt.stories';

const meta: Meta<ExtFnProps> = {
  title: 'core/utils/removeExt',
  argTypes: extractExtMeta.argTypes,
};

export default meta;

type Story = StoryObj<ExtFnProps>;

export const Default: Story = {
  args: {
    str: 'test.png',
    accept: ['png', 'jpeg'],
  },
  render: (args) => {
    const [str, setStr] = useState(args.str);

    useEffect(() => {
      setStr(args.str);
    }, [args.str]);

    return (
      <Flex direction='column' align={{ items: 'center' }} gap='4'>
        <Typography>{str}</Typography>
        <Button
          label='확장자 제거하기'
          onClick={() => setStr(removeExt({ str }))}
        />
      </Flex>
    );
  },
};
