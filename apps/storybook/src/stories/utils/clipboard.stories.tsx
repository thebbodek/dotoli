import { Button, Flex, InputField, Typography } from '@bbodek/internal-ui';
import { clipboard, ClipboardParams } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

const meta = {
  title: 'core/utils/clipboard',
  argTypes: {
    text: {
      description: 'copy text',
      control: 'text',
      type: { name: 'string', required: true },
    },
  },
} satisfies Meta<ClipboardParams>;

export default meta;

type Story = StoryObj<ClipboardParams>;

export const Default: Story = {
  args: {
    text: '이 텍스트가 복사됩니다',
  },
  render: ({ text }) => {
    const [copyText, setCopyText] = useState(text);
    const [value, setValue] = useState('');

    useEffect(() => {
      setCopyText(text);
    }, [text]);

    return (
      <Flex align={{ items: 'center' }} direction='column' gap='16'>
        <div className='in-flex-h-stack-center gap-4'>
          <Typography>{copyText}</Typography>
          <Button
            label='복사하기'
            size='sm'
            onClick={() => clipboard({ text: copyText })}
          />
        </div>
        <InputField
          className='bg-in-gray-02 rounded-in-8 px-3 py-2'
          label='복사 후 여기에 붙여넣어 보세요!'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Flex>
    );
  },
};
