import { Button } from '@bbodek/internal-ui';
import { composeEventHandler, ComposeEventHandler } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { MouseEvent } from 'react';

type Props = ComposeEventHandler<MouseEvent<HTMLButtonElement>>;

const meta = {
  title: 'core/utils/composeEventHandler',
  argTypes: {
    internalEventHandler: {
      description: 'internal event handler',
      type: {
        name: 'function',
        required: true,
      },
    },
    externalEventHandler: {
      description: 'external event handler',
      type: 'function',
    },
  },
} satisfies Meta<Props>;

export default meta;

type Story = StoryObj<Props>;

const ComposeEventHandlerButton = ({
  externalEventHandler,
}: Pick<Props, 'externalEventHandler'>) => {
  const internalEventHandler = (e: MouseEvent<HTMLButtonElement>) => {
    alert(
      `내부 이벤트 핸들러 실행! ${e.currentTarget.textContent} 버튼이 클릭 되었습니다.`,
    );
  };

  const onClick = composeEventHandler<MouseEvent<HTMLButtonElement>>({
    internalEventHandler,
    externalEventHandler,
  });

  return <Button label='Compose' onClick={onClick} />;
};

export const Default: Story = {
  render: () => {
    const externalEventHandler = (e: MouseEvent<HTMLButtonElement>) => {
      alert(
        `외부 이벤트 핸들러 실행! ${e.currentTarget.textContent} 버튼이 클릭 되었습니다.`,
      );
    };

    return (
      <ComposeEventHandlerButton externalEventHandler={externalEventHandler} />
    );
  },
};
