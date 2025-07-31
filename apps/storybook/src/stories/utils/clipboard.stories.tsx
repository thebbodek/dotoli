import { Button, Flex, InputField, Typography } from '@bbodek/internal-ui';
import { clipboard, ClipboardParams } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

const meta: Meta<ClipboardParams> = {
  title: 'core/utils/clipboard',
  argTypes: {
    text: {
      control: 'text',
      type: 'string',
    },
  },
};

export default meta;

type Story = StoryObj<ClipboardParams>;

export const Default: Story = {
  args: {
    text: '이 텍스트가 복사됩니다',
  },
  render: ({ text }: ClipboardParams) => {
    const [copyText, setCopyText] = useState(text);

    useEffect(() => {
      setCopyText(text);
    }, [text]);

    return (
      <Flex direction='column' align={{ items: 'center' }} gap={4}>
        <div className='in-flex-h-stack-center gap-4'>
          <Typography>{copyText}</Typography>
          <Button
            size='sm'
            label='복사하기'
            onClick={() => clipboard({ text: copyText })}
          />
        </div>
        <InputField
          placeholder='복사 후 여기에 붙여넣어 보세요!'
          rootClassName='w-full'
        />
      </Flex>
    );
  },
};
