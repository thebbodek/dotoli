import { useClickOutside, UseClickOutsideProps } from '@bbodek/hooks';
import { Button } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta = {
  title: 'core/hooks/useClickOutSide',
  argTypes: {
    onClose: {
      description: 'on close',
      action: 'clicked',
      type: { name: 'function', required: true },
    },
    useClickOutsideEvent: {
      control: 'boolean',
      description: 'use click outside event',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
  },
} satisfies Meta<UseClickOutsideProps>;

export default meta;

type Story = StoryObj<UseClickOutsideProps>;

export const Default: Story = {
  args: {
    useClickOutsideEvent: true,
  },
  render: ({ useClickOutsideEvent = true }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { contentRef } = useClickOutside<HTMLDivElement>({
      onClose: () => setIsOpen(false),
      useClickOutsideEvent,
    });

    return (
      <div ref={contentRef} className='in-flex-v-stack-center relative'>
        <Button onClick={() => setIsOpen(true)} label='Open' />
        {isOpen && (
          <div className='bg-in-gray-02 in-flex-h-stack-center absolute h-[100px] w-[200px] rounded-lg p-4'>
            Open!!
          </div>
        )}
      </div>
    );
  },
};
