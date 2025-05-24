import { Button } from '@bbodek/internal-ui';
import { composeEventHandler, ComposeEventHandler } from '@bbodek/utils';
import type { StoryObj } from '@storybook/react';
import { MouseEvent } from 'react';

const meta = {
  title: 'core/utils/composeEventHandler',
  argTypes: {
    internalEventHandler: {
      type: {
        name: 'function',
        required: true,
      },
    },
    externalEventHandler: {
      type: 'function',
    },
  },
};

export default meta;

type Story = StoryObj<ComposeEventHandler<() => void>>;

const ComposeEventHandlerButton = ({
  externalEventHandler,
}: Pick<
  ComposeEventHandler<MouseEvent<HTMLButtonElement>>,
  'externalEventHandler'
>) => {
  const internalEventHandler = (e: MouseEvent<HTMLButtonElement>) => {
    alert(`내부 이벤트 핸들러 실행! ${e.currentTarget.className}`);
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
      alert(`외부 이벤트 핸들러 실행! ${e.currentTarget.className}`);
    };

    return (
      <ComposeEventHandlerButton externalEventHandler={externalEventHandler} />
    );
  },
};
