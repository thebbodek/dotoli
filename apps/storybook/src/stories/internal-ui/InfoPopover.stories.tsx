import { Icon, InfoPopover, Typography } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as popoverMeta } from './Popover.stories';

const meta = {
  title: 'core/internal-ui/InfoPopover',
  component: InfoPopover,
  argTypes: {
    ...popoverMeta.argTypes,
    title: {
      control: 'object',
      description: 'InfoPopover title',
      type: {
        name: 'string',
        required: true,
      },
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    innerClassName: {
      control: 'text',
      description: 'InfoPopover inner className',
      type: 'string',
    },
    className: {
      control: 'text',
      description: 'InfoPopover className',
      type: 'string',
    },
  },
} satisfies Meta<typeof InfoPopover>;

export default meta;

type Story = StoryObj<typeof InfoPopover>;

export const Default: Story = {
  args: { title: '배송 유형이란?' },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
      <InfoPopover
        {...args}
        trigger={
          <button
            className='flex items-center gap-x-0.5'
            type='button'
            onClick={() => setIsOpen((v) => !v)}
          >
            <Typography color='black' variant='body-18-b'>
              배송 유형
            </Typography>
            <Icon
              className='text-in-gray-04 text-[1.125rem]'
              iconKey='warning-circle'
              weight='fill'
            />
          </button>
        }
        className='w-[330px]'
        innerClassName='in-flex-v-stack gap-y-2.5'
        isOpen={isOpen}
        onPopoverClose={close}
      >
        <InfoPopover.Description
          description={
            <>
              사용수량을 직전 영업일에 배송하는 일반배송 외 <br />
              주말/공휴일에도 배송하는 유형을 지정할 수 있습니다. <br />
              <strong className='text-in-primary-05'>
                ※ 토요일/일요일 배송은 공휴일 여부와 상관없이 배송됩니다.
              </strong>
            </>
          }
        />
        <div className='bg-in-gray-01 rounded-in-6 h-[160px] w-full' />
      </InfoPopover>
    );
  },
};
