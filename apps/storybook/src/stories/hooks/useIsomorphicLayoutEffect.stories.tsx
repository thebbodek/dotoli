import { useIsomorphicLayoutEffect } from '@bbodek/hooks';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

const meta = {
  title: 'core/hooks/useIsomorphicLayoutEffect',
  parameters: {
    docs: {
      description: {
        component: `useLayoutEffect 사용시 server side 에서 발생하는 경고 제거를 위해 사용하는 hook 입니다.<br/> 
          server side에서는 useEffect 방식을 쓰고, client side에서는 useLayoutEffect 방식을 사용합니다.`,
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useIsomorphicLayoutEffect(() => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }, []);

    return (
      <div
        className='bg-in-gray-02 rounded-in-8 in-flex-h-stack-center h-40 w-96 p-4'
        ref={ref}
      >
        width is {width}
      </div>
    );
  },
};
