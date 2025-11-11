import { Button, Flex, Typography } from '@bbodek/internal-ui';
import { ACCEPT_FILES, ExtFnParams, extractExt } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

const meta = {
  title: 'core/utils/extractExt',
  argTypes: {
    str: {
      control: 'text',
      description: 'file name with ext',
      type: { name: 'string', required: true },
    },
    accept: {
      description: 'accept file extensions',
      table: {
        type: { summary: 'AcceptFileExt[]' },
        defaultValue: {
          summary: `[${ACCEPT_FILES.map((ext) => `'${ext}'`).join(', ')}]`,
        },
      },
    },
  },
} satisfies Meta<ExtFnParams>;

export default meta;

type Story = StoryObj<ExtFnParams>;

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
