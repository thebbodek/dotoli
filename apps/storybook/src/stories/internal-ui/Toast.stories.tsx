import { Button } from '@bbodek/internal-ui';
import { CreateToastOption, toast } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';

export interface ToastArgs extends Omit<CreateToastOption, 'type'> {}

const meta: Meta<ToastArgs> = {
  title: 'core/internal-ui/Toast',
  argTypes: {
    content: {
      control: {
        type: 'object',
      },
      description: 'Toast content',
      type: {
        required: true,
        name: 'string',
      },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    duration: {
      control: {
        type: 'number',
      },
      description: 'Toast duration',
    },
    useClose: {
      type: 'function',
      description: 'use close',
    },
    actionOption: {
      control: {
        type: 'object',
      },
      description: 'action option',
    },
  },
};

export default meta;

type Story = StoryObj<ToastArgs>;

export const Default: Story = {
  args: {
    content: '버튼 없는 토스트 UI, n 초 뒤에 자동 삭제',
  },
  render: ({ content, ...args }) => (
    <Button onClick={() => toast.info(content, args)} label='open toast' />
  ),
};

export const WithClose: Story = {
  args: {
    content: '처리 되었습니다',
    useClose: true,
    duration: Infinity,
  },
  render: ({ content, ...args }) => (
    <Button onClick={() => toast.info(content, args)} label='open toast' />
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
    <Button onClick={() => toast.info(content, args)} label='open toast' />
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
    <Button onClick={() => toast.info(content, args)} label='open toast' />
  ),
};
