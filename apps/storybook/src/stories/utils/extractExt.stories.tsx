import { Button, Flex, Typography } from '@bbodek/internal-ui';
import { ACCEPT_FILES, ExtFnProps, extractExt } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<ExtFnProps> = {
  title: 'core/utils/extractExt',
  argTypes: {
    str: {
      control: 'text',
      description: 'file name with ext',
    },
    accept: {
      control: 'object',
      options: ACCEPT_FILES,
      table: {
        defaultValue: {
          summary: generateArgTypeSummary({
            options: ACCEPT_FILES,
          }),
        },
      },
    },
  },
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
          label='확장자 추출하기'
          onClick={() => setStr(extractExt({ str }))}
        />
      </Flex>
    );
  },
};
