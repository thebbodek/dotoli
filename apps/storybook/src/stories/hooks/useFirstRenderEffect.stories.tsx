import { useFirstRenderEffect } from '@bbodek/hooks';
import { Flex, IconButton } from '@bbodek/internal-ui';
import type { Meta } from '@storybook/react';
import { useState } from 'react';

const meta: Meta = {
  title: 'core/hooks/useFirstRenderEffect',
  parameters: {
    docs: {
      description: {
        component:
          '첫 번째 렌더 시에만 실행해야 하는 함수를 위해 사용하는 hook 입니다.',
      },
    },
  },
};

export default meta;

export const Default = {
  render: () => {
    const [count, setCount] = useState(0);

    useFirstRenderEffect(() => {
      alert(
        `카운트를 시작합니다 ${count}부터 시작! \n(첫 렌더링 시에만 나타나는 메세지 입니다)`,
      );
    });

    return (
      <Flex align={{ items: 'center' }} gap='4'>
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
