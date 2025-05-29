import { Button, ConfirmModal } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as ModalBaseMeta } from '@/stories/internal-ui/ModalBase.stories';

const { isOpen } = ModalBaseMeta.argTypes ?? {};

const meta: Meta<typeof ConfirmModal> = {
  title: 'core/internal-ui/Modal/ConfirmModal',
  component: ConfirmModal,
  argTypes: {
    isOpen,
    title: {
      control: 'text',
      description: 'modal title',
      type: {
        required: true,
        name: 'string',
      },
    },
    description: {
      control: 'object',
      description: 'modal description',
      type: {
        required: true,
        name: 'string',
      },
    },
    useIcon: {
      control: 'boolean',
      description: 'use info icon',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onConfirm: {
      description: 'on confirm',
      type: {
        required: true,
        name: 'function',
      },
    },
    onCancel: {
      description: 'on cancel',
      type: 'function',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  args: {
    useIcon: false,
    title: '승인신청이 완료되었습니다',
    description: '승인이 완료되면 슬랙으로 알려드립니다',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onConfirm={() => setIsOpen(false)}
        />
      </>
    );
  },
};

export const WithClose: Story = {
  args: {
    useIcon: false,
    title: (
      <>
        삭제한 정보는 복구할 수 없습니다
        <br /> 정보를 삭제하시겠습니까?
      </>
    ),
    description: '선택한 정보가 모두 삭제됩니다',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onConfirm={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
        />
      </>
    );
  },
};

export const WithIcon: Story = {
  args: {
    useIcon: true,
    title: (
      <>
        삭제한 정보는 복구할 수 없습니다 <br />
        정보를 삭제하시겠습니까?
      </>
    ),
    description: '선택한 정보가 모두 삭제됩니다',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onConfirm={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
        />
      </>
    );
  },
};
