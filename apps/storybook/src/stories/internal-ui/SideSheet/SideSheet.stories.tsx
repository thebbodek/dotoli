import {
  Button,
  SIDE_SHEET_DEFAULT_CONTAINER_ID,
  SideSheet,
  SideSheetProps,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta = {
  title: 'core/internal-ui/SideSheet/SideSheet',
  component: SideSheet,
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'is open side sheet',
      type: { name: 'boolean', required: true },
    },
    containerId: {
      control: 'text',
      description: 'Portal target container id',
      table: {
        defaultValue: {
          summary: SIDE_SHEET_DEFAULT_CONTAINER_ID,
        },
        type: {
          summary: 'string',
        },
      },
    },
    title: {
      control: 'text',
      description: 'title',
      type: 'string',
    },
    isLoading: {
      control: 'boolean',
      description: 'is loading',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onClose: {
      description: 'on close',
      type: { name: 'function', required: true },
    },
  },
} satisfies Meta<SideSheetProps>;

export default meta;

type Story = StoryObj<SideSheetProps>;

export const Default: Story = {
  args: {
    isLoading: false,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div
        className='bg-in-gray-01 in-flex-h-stack-center relative h-[40rem] w-[800px] overflow-hidden'
        id={SIDE_SHEET_DEFAULT_CONTAINER_ID}
      >
        <Button label='Open SideSheet' onClick={() => setIsOpen(true)} />
        <SideSheet
          {...args}
          className='p-6'
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <p className='text-in-gray-09 text-sm'>SideSheet 컨텐츠 영역</p>
        </SideSheet>
      </div>
    );
  },
};

export const WithLoading: Story = {
  args: {
    isLoading: true,
    title: '승인 현황',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div
        className='bg-in-gray-01 in-flex-h-stack-center relative h-[40rem] w-[800px] overflow-hidden'
        id={SIDE_SHEET_DEFAULT_CONTAINER_ID}
      >
        <Button label='Open SideSheet' onClick={() => setIsOpen(true)} />
        <SideSheet
          {...args}
          className='p-6'
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <p className='text-in-gray-09 text-sm'>로딩 중인 SideSheet</p>
        </SideSheet>
      </div>
    );
  },
};

export const WithScrollContent: Story = {
  args: {
    isLoading: false,
    title: '승인 현황',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div
        className='bg-in-gray-01 in-flex-h-stack-center relative h-[40rem] w-[800px] overflow-hidden'
        id={SIDE_SHEET_DEFAULT_CONTAINER_ID}
      >
        <Button label='Open SideSheet' onClick={() => setIsOpen(true)} />
        <SideSheet
          {...args}
          className='border-in-gray-02 border-t p-6'
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <>
            {Array.from({ length: 20 }, (_, i) => (
              <div
                className='border-in-gray-03 mb-3 rounded-lg border p-4'
                key={i}
              >
                <p className='text-in-gray-09 text-sm'>리스트 아이템 {i + 1}</p>
              </div>
            ))}
          </>
        </SideSheet>
      </div>
    );
  },
};
