import { useFirstRenderEffect } from '@bbodek/hooks';
import { Flex, IconButton } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta = {
  title: 'core/hooks/useFirstRenderEffect',
  parameters: {
    docs: {
      description: {
        component:
          '첫 번째 렌더 시에만 실행되어야 하는 함수를 위해 사용하는 hook 입니다.',
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [count, setCount] = useState(0);

    useFirstRenderEffect(() => {
      alert(`카운트를 시작합니다!\n(첫 렌더링 시에만 나타나는 메세지 입니다)`);
    });

    return (
      <Flex align={{ items: 'center' }} gap='6'>
        <p>Count: {count}</p>
        <IconButton
          iconKey='plus'
          arialLabel='더하기'
          onClick={() => setCount((c) => c + 1)}
        />
      </Flex>
    );
  },
};
