import { Button, Flex, Typography } from '@bbodek/internal-ui';
import { ExtFnProps, parseExt } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { default as extractExtMeta } from './extractExt.stories';

const meta: Meta<ExtFnProps> = {
  title: 'core/utils/parseExt',
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
          label='확장자 분리하기'
          onClick={() =>
            setStr(`${parseExt({ str }).removedExt} / ${parseExt({ str }).ext}`)
          }
        />
      </Flex>
    );
  },
};
