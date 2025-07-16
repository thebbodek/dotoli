import { useScrollLockEffect, UseScrollLockEffectProps } from '@bbodek/hooks';
import { Toggle } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<UseScrollLockEffectProps> = {
  title: 'core/hooks/useScrollLockEffect',
  argTypes: {
    isLocked: {
      control: 'boolean',
      description: 'isLocked',
    },
    target: {
      control: 'text',
      description: 'target element id',
      table: {
        defaultValue: {
          summary: 'document.body',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<UseScrollLockEffectProps>;

export const Default: Story = {
  render: (args) => {
    const [isLocked, setIsLocked] = useState(false);

    useScrollLockEffect({
      target: 'target',
      isLocked: args.isLocked ?? isLocked,
    });

    return (
      <>
        <Toggle
          label='Locked'
          checked={isLocked}
          onChange={() => setIsLocked((v) => !v)}
        />
        <div
          id='target'
          className='bg-in-gray-02 rounded-in-8 mt-4 h-[500px] w-[500px] overflow-y-auto p-4'
        >
          <div className='h-[1000px]' />
        </div>
      </>
    );
  },
};
