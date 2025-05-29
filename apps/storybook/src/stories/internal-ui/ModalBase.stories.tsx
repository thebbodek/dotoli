import { Button, MODAL_VARIANTS, ModalBase } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<typeof ModalBase> = {
  title: 'core/internal-ui/Modal/ModalBase',
  component: ModalBase,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(MODAL_VARIANTS),
      description: 'Modal variant',
      table: {
        defaultValue: {
          summary: MODAL_VARIANTS.MODAL,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(MODAL_VARIANTS),
          }),
        },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'is open modal',
    },
    target: {
      control: 'select',
      description: 'target element id',
      table: {
        defaultValue: {
          summary: 'portal',
        },
      },
    },
    dimmed: {
      control: 'boolean',
      description: 'modal background dimmed',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ModalBase>;

export const Default: Story = {
  args: {
    variant: MODAL_VARIANTS.MODAL,
    dimmed: true,
    isOpen: false,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <ModalBase {...args} isOpen={isOpen}>
          <section className='shadow-30 rounded-8 bg-white p-2'>
            <div className='flex-h-stack-center h-20 w-40'>Modal</div>
            <Button
              label='닫기'
              size='md'
              className='w-full'
              onClick={() => setIsOpen(false)}
            />
          </section>
        </ModalBase>
        <div id='portal' />
      </>
    );
  },
};
