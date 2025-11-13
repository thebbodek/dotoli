import { Button, Toast } from '@bbodek/internal-ui';
import { CreateToastOption, toast } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';

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
