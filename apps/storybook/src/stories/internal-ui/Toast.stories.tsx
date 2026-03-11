import { Button, InfoDialog, Toast } from '@bbodek/internal-ui';
import { CreateToastOption, toast } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { overlay } from 'overlay-kit';
import { Toaster } from 'react-hot-toast';

export interface ToastArgs extends Omit<CreateToastOption, 'type'> {}

const meta = {
  title: 'core/internal-ui/Toast',
  component: Toast,
  argTypes: {
    content: {
      control: 'object',
      description: 'Toast content',
      type: {
        required: true,
        name: 'other',
        value: 'ReactNode',
      },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    duration: {
      control: 'number',
      description: 'Toast duration',
      type: 'number',
      table: {
        defaultValue: {
          summary: '2000',
        },
      },
    },
    useClose: {
      control: 'boolean',
      type: 'boolean',
      description: 'use close',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onClose: {
      description: 'Toast on close',
      type: 'function',
    },
    actionOption: {
      control: 'object',
      description: 'action button option',
      table: {
        type: {
          summary:
            'Pick<ActionButtonProps, "label" | "as" | "linkOption" | "buttonOption">',
        },
      },
    },
  },
} satisfies Meta<ToastArgs>;

export default meta;

type Story = StoryObj<ToastArgs>;

export const Default: Story = {
  args: {
    content: '버튼 없는 토스트 UI, n 초 뒤에 자동 삭제',
  },
  render: ({ content, ...args }) => (
    <Button label='open toast' onClick={() => toast.info(content, args)} />
  ),
};

export const WithClose: Story = {
  args: {
    content: '처리 되었습니다',
    useClose: true,
    duration: Infinity,
  },
  render: ({ content, ...args }) => (
    <Button label='open toast' onClick={() => toast.info(content, args)} />
  ),
};

export const WithAction: Story = {
  args: {
    content: '데이터가 요청 되었습니다',
    actionOption: {
      label: '바로보기',
      linkOption: { href: 'https://www.google.com', target: '_blank' },
    },
  },
  render: ({ content, ...args }) => (
    <Button label='open toast' onClick={() => toast.info(content, args)} />
  ),
};

export const WithActionAndClose: Story = {
  args: {
    content: '버튼 있는 토스트 UI, 버튼 있는 토스트 UI,버튼 있는 토스트 UI',
    duration: Infinity,
    useClose: true,
    actionOption: {
      label: '바로보기',
      linkOption: { href: 'https://www.google.com', target: '_blank' },
    },
  },
  render: ({ content, ...args }) => (
    <Button label='open toast' onClick={() => toast.info(content, args)} />
  ),
};

export const WithMultiToaster: Story = {
  args: {
    content: '내부 토스트 알림',
  },
  render: ({ content, ...args }) => {
    const openModal = () => {
      overlay.open(({ isOpen, unmount }) => (
        <InfoDialog
          confirmOption={{
            onConfirm: () => {
              toast.dismissAll('internal');
              toast.success('외부 토스트 알림');
              unmount();
            },
          }}
          isOpen={isOpen}
          title='토스트 테스트'
        >
          <div className='bg-in-gray-02 rounded-in-8 in-flex-h-stack-center relative h-[25.625rem] w-[48.75rem] overflow-hidden'>
            <Toaster
              containerStyle={{
                position: 'absolute',
                top: 20,
                left: 20,
                bottom: 20,
                right: 20,
              }}
              containerClassName='top-0 right-0 w-full h-full'
              toasterId='internal'
            />
            <Button
              label='open toast'
              onClick={() => {
                toast.dismissAll('internal');
                toast.info(content, { toasterId: 'internal', ...args });
              }}
            />
          </div>
        </InfoDialog>
      ));
    };

    return (
      <>
        <Button label='open modal' onClick={openModal} />
      </>
    );
  },
};
