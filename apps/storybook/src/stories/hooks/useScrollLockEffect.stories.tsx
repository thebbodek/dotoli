import { useScrollLockEffect, UseScrollLockEffectProps } from '@bbodek/hooks';
import { Toggle, Typography } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta = {
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
} satisfies Meta<UseScrollLockEffectProps>;

export default meta;

type Story = StoryObj<UseScrollLockEffectProps>;

export const Default: Story = {
  args: {
    isLocked: false,
  },
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
          className='bg-in-gray-02 rounded-in-8 relative mt-4 h-[500px] w-[500px] overflow-scroll'
        >
          <Typography className='in-flex-h-stack-center sticky top-0 h-full w-full'>
            scroll me
          </Typography>
          <div className='h-[1000px]' />
        </div>
      </>
    );
  },
};
